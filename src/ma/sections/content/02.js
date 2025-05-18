const handleContent02 = () => ({
  monthUrls: [],
  async init() {
    const blogUrls = Alpine.store("blogUrls");
    const resMonths = await fetch("/src/json/month_urls.json");
    const nowMonth = new Date().getMonth() + 1;
    this.monthUrls = (await resMonths.json())
      .filter((item) => {
        return item.month >= nowMonth;
      })
      .map((item) => {
        return {
          ...item,
          events: blogUrls
            .filter((blog) => {
              return (
                item.month ===
                Number(dayjs("" + blog.scheduleStartDate).format("M"))
              );
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

replaceWith("content02", "/src/ma/sections/content/02.html");
