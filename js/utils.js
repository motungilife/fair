function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true; // 비동기 로드

    script.onload = () => {
      // 스크립트가 로드되고 실행되면 resolve 호출
      resolve();
    };

    script.onerror = () => {
      // 스크립트 로드 실패 시 reject 호출
      reject(new Error(`스크립트 로드 실패: ${url}`));
    };

    document.head.appendChild(script); // <head>에 스크립트 태그 추가 (또는 document.body)
  });
}

const libs = ["https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"];
const scrs = ["/js/tabs.js"];
if (location.hostname !== "127.0.0.1") {
  for (let i = 0; i < scrs.length; i++) {
    scrs[i] =
      "https://cdn.jsdelivr.net/gh/motungilife/motungilife@main" + scrs[i];
  }
}

scrs.unshift(...libs);

document.addEventListener("DOMContentLoaded", async () => {
  for (let i = 0; i < scrs.length; i++) {
    await loadScript(scrs[i]);
  }
  await loadScript(
    "https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"
  );
});
