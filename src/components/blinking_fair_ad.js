let d = 0;
let h = 0;
let m = 0;
let s = 0;
let ss = 0;

const alpineBlinkingFairAd = () => ({
  fair: {},
  msg: "사전 등록 알아보기",
  dDay: "무료 관람 기회 놓치지 마세요!",
  intervalId: null,
  async init() {
    const n = new Date();
    const now = Number(
      n.getFullYear() +
        String(n.getMonth() + 1).padStart(2, "0") +
        String(n.getDate()).padStart(2, "0")
    );

    const fairs = await (await fetch("/src/json/blog_urls.json")).json();
    const fair = fairs.find((fair) => fair.preregEndDate > now) || {};
    const preregEndDate = new Date(
      ("" + fair.preregEndDate).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
    );
    const diff = preregEndDate - n;

    d = Math.floor(diff / (1000 * 60 * 60 * 24));
    h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    s = Math.floor((diff % (1000 * 60)) / 1000);
    ss = Math.floor((diff % 1000) / 10);
    if (d < 2) {
      this.msg = "사전 등록 마감 임박!";
      this.intervalId = setInterval(() => {
        ss--;
        if (ss < 0) {
          ss = 99;
          s--;
        }
        if (s < 0) {
          s = 59;
          m--;
        }
        if (m < 0) {
          m = 59;
          h--;
        }
        if (h < 0) {
          h = 23;
          d--;
        }
        if (d < 0) {
          clearInterval(this.intervalId);
          this.msg = "사전 등록 마감!";
          this.dDay = "사전 등록 마감!";
          return;
        }

        const sH = String(h).padStart(2, "0");
        const sM = String(m).padStart(2, "0");
        const sS = String(s).padStart(2, "0");
        const sSS = String(ss).padStart(2, "0");
        this.dDay = `D-${d}  ${sH}:${sM}:${sS}.${sSS}`;
      }, 10);
    }
  },
  destory() {
    clearInterval(this.intervalId);
  },
});

async function appendBody(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url + " 불러오기 실패");
  const html = await res.text();
  const div = document.createElement("div");
  document.querySelector("body").appendChild(div);
  div.outerHTML = html;
}

if (!window.loadScript) {
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(script);
      };
      script.onerror = (err) => {
        console.error(src + " 스크립트 로드 실패");
        reject(new Error(src + " 스크립트 로드 실패"));
      };
      document.head.appendChild(script);
    });
  }
}

async function loadBlinkingFairAd() {
  await appendBody("/src/components/blinking_fair_ad.html");
  await loadScript(
    "https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"
  );
}

loadBlinkingFairAd();
