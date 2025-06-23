const handleContentTop = () => ({
  vInfo: {},
  async init() {
    const resVenues = await fetch(
      "/src/json/venue_urls.json?s=" + new Date().getTime()
    );
    const vn = getVenue(subDns);
    this.vInfo = (await resVenues.json()).find((r) => r.venue === vn) || {
      venue: "-",
      msg: "-",
    };
  },
});

replaceWith("content-top", "/src/pa/venue/sections/content/top.html");
