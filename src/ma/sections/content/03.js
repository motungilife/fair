const handleContent03 = () => ({
  regionUrls: [],
  async init() {
    const blogUrls = Alpine.store("blogUrls");
    const resRegions = await fetch("/src/json/region_urls.json");
    this.regionUrls = (await resRegions.json())
      .map((item) => {
        return {
          ...item,
          events: blogUrls
            .filter((blog) => {
              return item.region === blog.eventRegion;
            })
            .map((blog) => blog.eventName)
            .join(", "),
        };
      })
      .filter((item) => {
        return item.events.trim().length > 0;
      });
  },
});

replaceWith("content03", "/src/ma/sections/content/03.html");
