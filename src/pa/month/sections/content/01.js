const handleContent01 = () => ({
  fairs: [],
  init() {
    const blogUrls = Alpine.store("blogUrls");
    const subM = new Date().getFullYear() + subDns.replace(/^pa/, "");
    this.fairs = blogUrls
      .filter((fair) => {
        const scheduleMonth = ("" + fair.scheduleStartDate).substring(0, 6);
        return scheduleMonth === subM;
      })
      .map((fair) => ({
        ...fair,
        fromToDt: `${dayjs("" + fair.scheduleStartDate).format(
          "YYYY.MM.DD"
        )} ~ ${dayjs("" + fair.scheduleEndDate).format("YYYY.MM.DD")}`,
        preregDt: dayjs("" + fair.preregEndDate).format("YYYY.MM.DD"),
      }));
  },
});

replaceWith("content01", "/src/pa/month/sections/content/01.html");
