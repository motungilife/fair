const xlsx = require("xlsx");
const fs = require("fs-extra");
const path = require("path");

// 필드명 변환 함수 (이제 변환 없이 원본 필드명 그대로 반환)
function convertFieldName(field) {
  return field;
}

// Excel 파일 파싱 함수
function parseExcelToJS() {
  try {
    const excelFilePath = path.join(__dirname, "fair_urls.xlsx");
    const workbook = xlsx.readFile(excelFilePath);
    const sheetNames = workbook.SheetNames;
    const outputDir = path.join(__dirname, "src", "ma");

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
      if (jsonData.length > 0) {
        // 파일명: blog_datas_시트명.json (특수문자/공백 제거, 숫자 시작시 _ 추가)
        const safeSheetName = sheetName
          .replace(/[^a-zA-Z0-9_가-힣]/g, "_")
          .replace(/^[0-9]/, "_$&");
        const fileName = `${safeSheetName}.json`;
        const filePath = path.join(outputDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`${filePath} 생성 완료!`);
      } else {
        console.log(`경고: ${sheetName} 시트에 데이터가 없습니다.`);
      }
    });
  } catch (error) {
    console.error("변환 중 오류 발생:", error);
  }
}

// 스크립트 실행
parseExcelToJS();
