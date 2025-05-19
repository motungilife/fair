const getVenue = (venue) => {
  if (venue === "pa01") return "BEXCO";
  else if (venue === "pa02") return "COEX";
  else if (venue === "pa03") return "EXCO";
  else if (venue === "pa04") return "KDJ센터";
  else if (venue === "pa05") return "OSCO";
  else if (venue === "pa06") return "SETEC";
  else if (venue === "pa07") return "대전컨벤션센터";
  else return "";
};

document.addEventListener("alpine:init", async () => {
  const blogUrls = await (await fetch("/src/json/blog_urls.json")).json();
  Alpine.store("blogUrls", blogUrls);

  await loadScript("/src/pa/venue/sections/content/top.js");
  await loadScript("/src/pa/venue/sections/content/01.js");
});
