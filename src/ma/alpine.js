function includeHTML(targetId, url) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(url + " 불러오기 실패");
      return res.text();
    })
    .then((html) => {
      const el = document.getElementById(targetId);
      if (el) el.innerHTML = html;
    })
    .catch(console.error);
}
document.addEventListener("DOMContentLoaded", function () {
  includeHTML("header", "/src/ma/header.html");
  includeHTML("tabs", "/src/ma/tabs.html");
  includeHTML("content", "/src/ma/content.html");
  includeHTML("footer", "/src/ma/footer.html");
});

function handleContent() {
  return {
    blogUrls: [],
    preUrls: [],
    monthUrls: [],
    regionUrls: [],
    venueUrls: [],
    async init() {
      const resBlogs = await fetch("/src/ma/blog_urls.json");
      this.blogUrls = await resBlogs.json();
      this.preUrls = this.blogUrls.filter((item) => {
        const now = dayjs();
        const preregEndDate = dayjs("" + item.preregEndDate);
        return (
          now.isBefore(preregEndDate) &&
          now.startOf("month").isBefore(preregEndDate) &&
          now.endOf("month").add(15, "day").isAfter(preregEndDate)
        );
      });

      this.preUrls = this.preUrls.map((item) => {
        const now = dayjs();
        const preregEndDate = dayjs("" + item.preregEndDate);
        const daysLeft = preregEndDate.diff(now, "day");
        return {
          ...item,
          admissionFee: `사전 등록 마감일 : ${preregEndDate.format(
            "YYYY.MM.DD"
          )}`,
        };
      });

      const resMonths = await fetch("/src/ma/month_urls.json");
      const nowMonth = new Date().getMonth() + 1;
      this.monthUrls = (await resMonths.json())
        .filter((item) => {
          return item.month >= nowMonth;
        })
        .map((item) => {
          return {
            ...item,
            events: this.blogUrls
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

      const resRegions = await fetch("/src/ma/region_urls.json");
      this.regionUrls = (await resRegions.json())
        .map((item) => {
          return {
            ...item,
            events: this.blogUrls
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

      const resVenues = await fetch("/src/ma/venue_urls.json");
      this.venueUrls = (await resVenues.json())
        .map((item) => {
          return {
            ...item,
            events: this.blogUrls
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
  };
}
