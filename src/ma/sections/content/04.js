const handleContent04 = () => ({
  venueUrls: [],
  async init() {
    const blogUrls = Alpine.store("blogUrls");
    const resVenues = await fetch(
      "/src/json/venue_urls.json?s=" + new Date().getTime()
    );
    this.venueUrls = (await resVenues.json())
      .map((item) => {
        return {
          ...item,
          events: blogUrls
            .filter((blog) => {
              return item.venue === blog.eventVenue;
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

replaceWith("content04", "/src/ma/sections/content/04.html");
