document.addEventListener("alpine:init", async () => {
  const blogUrls = await (
    await fetch("/src/json/blog_urls.json?s=" + new Date().getTime())
  ).json();
  Alpine.store("blogUrls", blogUrls);

  await loadScript("/src/ma/sections/content/top.js");
  await loadScript("/src/ma/sections/content/01.js");
  await loadScript("/src/ma/sections/content/02.js");
  await loadScript("/src/ma/sections/content/03.js");
  await loadScript("/src/ma/sections/content/04.js");
});
