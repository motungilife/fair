const subDns = location.hostname.split(".")[0];
const menuType = location.pathname.split(".html")[0].split("/").pop();

const mainTitle = new Date().getFullYear() + "년 건축박람회";
let subTitle = "";
if (subDns === "ma01") {
  subTitle = "마감 임박";
} else if (subDns === "ma02") {
  subTitle = "일정";
} else if (subDns === "ma03") {
  subTitle = "지역";
} else if (subDns === "ma04") {
  subTitle = "전시장";
} else if (menuType === "month") {
  subTitle = subDns.replace(/^pa0?/, "") + "월";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#header .logo-text").innerText = mainTitle;
  document.title = `${mainTitle} - ${subTitle}`;

  const subNo = Number(subDns.replace(/^pa0?/, "")) - 1;
  if (menuType === "region") {
    fetch("/src/json/region_urls.json")
      .then((res) => res.json())
      .then((list) => {
        document.title = `${mainTitle} - ${list[subNo].name}`;
      })
      .catch((error) => {
        console.error("Error fetching region URLs:", error);
      });
  } else if (menuType === "venue") {
    fetch("/src/json/venue_urls.json")
      .then((res) => res.json())
      .then((list) => {
        document.title = `${mainTitle} - ${list[subNo].name}`;
      })
      .catch((error) => {
        console.error("Error fetching venue URLs:", error);
      });
  }

  document.querySelector(".footer .footer-brand").innerText = "motungi";
  document.querySelector("#com-addr").innerText = "N/A";
  document.querySelector("#com-no").innerText = "N/A";
});

const urlHash = location.hash || "#aros1";
const tabs = [
  {
    id: "aros1",
    name: "마감 임박",
    href: "https://ma01.motungilife.com/#aros1",
    active: urlHash === "#aros1",
  },
  {
    id: "aros2",
    name: "일정",
    href: "https://ma02.motungilife.com/#aros2",
    active: urlHash === "#aros2",
  },
  {
    id: "aros3",
    name: "지역",
    href: "https://ma03.motungilife.com/#aros3",
    active: urlHash === "#aros3",
  },
  {
    id: "aros4",
    name: "전시장",
    href: "https://ma04.motungilife.com/#aros4",
    active: urlHash === "#aros4",
  },
];

const handleTabs = () => ({
  tabs,
});
replaceWith("tabs", "/src/js/tabs.html");
