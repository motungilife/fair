let activeMenu = 1;
let sub = location.hostname;
if (sub.startsWith("pa")) {
  activeMenu = 2;
} else if (sub.startsWith("pb")) {
  activeMenu = 3;
} else if (sub.startsWith("pc")) {
  activeMenu = 4;
}

document.addEventListener("alpine:init", () => {
  Alpine.data("navTabs", () => ({
    list: [
      {
        id: 1,
        name: "마감 임박",
        url: "https://ma01.motungilife.com/#aros1",
        active: activeMenu === 1,
      },
      {
        id: 2,
        name: "일정",
        url: "https://ma02.motungilife.com/#aros2",
        active: activeMenu === 2,
      },
      {
        id: 3,
        name: "지역",
        url: "https://ma03.motungilife.com/#aros3",
        active: activeMenu === 3,
      },
      {
        id: 4,
        name: "전시장",
        url: "https://ma04.motungilife.com/#aros4",
        active: activeMenu === 4,
      },
    ],
  }));
});
