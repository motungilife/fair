const handleContentTop = () => ({
  rInfo: {},
  async init() {
    const resRegions = await fetch("/src/json/region_urls.json");
    const rg = getRetion(subDns);
    this.rInfo = (await resRegions.json()).find((r) => r.region === rg) || {
      region: "대한민국",
      msg: "전국",
    };
  },
});

replaceWith("content-top", "/src/pa/region/sections/content/top.html");
