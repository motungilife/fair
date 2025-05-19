const getRetion = (region) => {
  if (region === "pa01") return "서울";
  else if (region === "pa02") return "경기";
  else if (region === "pa03") return "대전";
  else if (region === "pa04") return "청주";
  else if (region === "pa05") return "대구";
  else if (region === "pa06") return "광주";
  else if (region === "pa07") return "부산";
  else return "";
};

document.addEventListener("alpine:init", async () => {
  const blogUrls = await (await fetch("/src/json/blog_urls.json")).json();
  Alpine.store("blogUrls", blogUrls);

  await loadScript("/src/pa/region/sections/content/top.js");
  await loadScript("/src/pa/region/sections/content/01.js");
});
