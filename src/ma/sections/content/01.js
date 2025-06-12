const handleContent01 = () => ({
  preUrls: [],
  init() {
    const blogUrls = Alpine.store("blogUrls");
    this.preUrls = blogUrls
      .filter((item) => {
        const now = dayjs();
        const preregEndDate = dayjs("" + item.preregEndDate);
        return (
          (now.isSame(preregEndDate, "day") || now.isBefore(preregEndDate)) &&
          now.add(14, "day").isAfter(preregEndDate)
        );
      })
      .map((item) => {
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
  },
});

replaceWith("content01", "/src/ma/sections/content/01.html");
