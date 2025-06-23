const handleContentTop = () => ({
  mInfo: {},
  async init() {
    const resMonths = await fetch(
      "/src/json/month_urls.json?s=" + new Date().getTime()
    );
    const subM = Number(subDns.replace(/^pa0?/, ""));
    this.mInfo = (await resMonths.json()).find(
      (item) => item.month === subM
    ) || { month: 0, msg: "none" };
  },
});

replaceWith("content-top", "/src/pa/month/sections/content/top.html");
