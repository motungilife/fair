document.addEventListener("alpine:init", async () => {
  const blogUrls = await (
    await fetch("/src/json/blog_urls.json?s=" + new Date().getTime())
  ).json();
  Alpine.store("blogUrls", blogUrls);

  await loadScript("/src/pa/month/sections/content/top.js");
  await loadScript("/src/pa/month/sections/content/01.js");
});
