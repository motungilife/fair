const handleContent01 = () => ({
  fairs: [],
  init() {
    const blogUrls = Alpine.store("blogUrls");
    let vn = getVenue(subDns);
    this.fairs = blogUrls
      .filter((fair) => fair.eventVenue === vn)
      .map((fair) => ({
        ...fair,
        fromToDt: `${dayjs("" + fair.scheduleStartDate).format(
          "YYYY.MM.DD"
        )} ~ ${dayjs("" + fair.scheduleEndDate).format("YYYY.MM.DD")}`,
        preregDt: dayjs("" + fair.preregEndDate).format("YYYY.MM.DD"),
      }));
  },
});

replaceWith("content01", "/src/pa/venue/sections/content/01.html");
