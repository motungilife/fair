const fs = require("fs-extra");
const path = require("path");
const cheerio = require("cheerio");
const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

// 소스 및 대상 디렉토리 정의
const SRC_DIR = path.join(__dirname, "src");
const DIST_DIR = path.join(__dirname, "dist");

// URL 변환 규칙 정의
const URL_TRANSFORMATIONS = [
  // src 폴더 경로를 CDN 또는 다른 경로로 변경
  // { from: /\/src\//g, to: "/dist/" },
  // 다른 URL 변환 규칙을 여기에 추가
  // 예: CDN 경로로 변경
  {
    from: /\/src\//g,
    to: "https://motungilife.github.io/fair/dist/",
  },
];

// 빌드 함수
async function build() {
  try {
    // dist 폴더가 존재하면 삭제 후 다시 생성
    await fs.emptyDir(DIST_DIR);
    console.log("🗑️  이전 dist 폴더 내용 삭제 완료");

    // src 폴더의 모든 파일을 dist로 복사
    await fs.copy(SRC_DIR, DIST_DIR);
    console.log("📝 src에서 dist로 파일 복사 완료");

    // HTML, HTM 파일에서 URL 경로 업데이트 및 압축
    console.log("🔍 HTML 파일 처리 중 (URL 업데이트 및 압축)...");
    const htmlFiles = await findFiles(DIST_DIR, ".html");
    const htmFiles = await findFiles(DIST_DIR, ".htm");
    const allHtmlFiles = [...htmlFiles, ...htmFiles];

    for (const file of allHtmlFiles) {
      // 파일 내용 읽기
      let content = await fs.readFile(file, "utf8");

      // URL 변환 적용
      for (const rule of URL_TRANSFORMATIONS) {
        content = content.replace(rule.from, rule.to);
      }

      // 변환된 내용으로 파일 업데이트
      await fs.writeFile(file, content, "utf8");

      // 더 복잡한 HTML 구조 처리가 필요하면 cheerio 사용
      await updateHtmlUrls(file);

      // HTML 압축
      await execAsync(
        `npx html-minifier-terser --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true -o "${file}" "${file}"`
      );
    }
    console.log(
      `✅ ${allHtmlFiles.length}개 HTML 파일 URL 업데이트 및 압축 완료`
    );

    // CSS 파일에서 URL 업데이트 및 압축
    console.log("🔍 CSS 파일 처리 중 (URL 업데이트 및 압축)...");
    const cssFiles = await findFiles(DIST_DIR, ".css");
    for (const file of cssFiles) {
      // CSS 파일 내의 URL 업데이트
      let content = await fs.readFile(file, "utf8");

      // URL 변환 적용 (url() 함수 내의 경로도 처리)
      for (const rule of URL_TRANSFORMATIONS) {
        content = content.replace(rule.from, rule.to);
      }

      // 변환된 내용으로 파일 업데이트
      await fs.writeFile(file, content, "utf8");

      // CSS 압축
      await execAsync(`npx cleancss -o "${file}" "${file}"`);
    }
    console.log(`✅ ${cssFiles.length}개 CSS 파일 URL 업데이트 및 압축 완료`);

    // JS 파일에서 URL 업데이트, 압축 및 난독화
    console.log("🔍 JavaScript 파일 처리 중 (URL 업데이트, 압축 및 난독화)...");
    const jsFiles = await findFiles(DIST_DIR, ".js");
    for (const file of jsFiles) {
      // JS 파일 내의 URL 업데이트
      let content = await fs.readFile(file, "utf8");

      // URL 변환 적용
      for (const rule of URL_TRANSFORMATIONS) {
        content = content.replace(rule.from, rule.to);
      }

      // 변환된 내용으로 파일 업데이트
      await fs.writeFile(file, content, "utf8");

      // JS 압축 및 난독화
      await execAsync(
        `npx terser "${file}" --compress --mangle --output "${file}"`
      );
    }
    console.log(
      `✅ ${jsFiles.length}개 JavaScript 파일 URL 업데이트, 압축 및 난독화 완료`
    );

    // JSON 파일 압축
    console.log("🔍 JSON 파일 압축 중...");
    const jsonFiles = await findFiles(DIST_DIR, ".json");
    for (const file of jsonFiles) {
      const content = await fs.readFile(file, "utf8");
      // JSON 파싱 후 다시 문자열화(공백 없이)
      const minified = JSON.stringify(JSON.parse(content));
      await fs.writeFile(file, minified, "utf8");
    }
    console.log(`✅ ${jsonFiles.length}개 JSON 파일 압축 완료`);

    console.log(
      "🎉 빌드 성공! dist 폴더에 URL이 업데이트되고 압축 및 난독화된 파일이 생성되었습니다."
    );
  } catch (error) {
    console.error("❌ 빌드 실패:", error);
    process.exit(1);
  }
}

// Cheerio를 사용하여 HTML 파일의 URL 속성 업데이트 (더 복잡한 케이스용)
async function updateHtmlUrls(file) {
  try {
    const content = await fs.readFile(file, "utf8");
    const $ = cheerio.load(content);

    // href 속성 업데이트 (a, link 태그 등)
    $("[href]").each((_, el) => {
      const href = $(el).attr("href");
      for (const rule of URL_TRANSFORMATIONS) {
        if (rule.from.test(href)) {
          $(el).attr("href", href.replace(rule.from, rule.to));
        }
      }
    });

    // src 속성 업데이트 (img, script 태그 등)
    $("[src]").each((_, el) => {
      const src = $(el).attr("src");
      for (const rule of URL_TRANSFORMATIONS) {
        if (rule.from.test(src)) {
          $(el).attr("src", src.replace(rule.from, rule.to));
        }
      }
    });

    // hx-get 속성 업데이트 (htmx 관련)
    $("[hx-get]").each((_, el) => {
      const hxGet = $(el).attr("hx-get");
      for (const rule of URL_TRANSFORMATIONS) {
        if (rule.from.test(hxGet)) {
          $(el).attr("hx-get", hxGet.replace(rule.from, rule.to));
        }
      }
    });

    // 업데이트된 내용 저장
    await fs.writeFile(file, $.html(), "utf8");
  } catch (error) {
    console.error(`HTML URL 업데이트 중 오류 발생 (${file}):`, error);
  }
}

// 특정 확장자를 가진 파일을 재귀적으로 찾는 함수
async function findFiles(dir, extension) {
  const files = [];

  async function findInDir(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await findInDir(fullPath);
      } else if (entry.isFile() && fullPath.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }

  await findInDir(dir);
  return files;
}

// 빌드 실행
build();
