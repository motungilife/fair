const emoji = {
  time: "⏰-🕰️-⏳-⌛-🕐-🕝-🕒-🕞-🕓-🕟-🕔-🕠-🕕-🕡-🕖-🕢-🕗-🕣-🕘-🕤-🕙-🕥-🕚-🕦-🕛-📆-📅-📆-🗓️",
  month: {
    1: "🎉-❄️",
    2: "💕-🌹",
    3: "🌸-📘",
    4: "🌷-☔️",
    5: "👨‍👩‍👧‍👦-🌼",
    6: "☀️-🏖️",
    7: "🏝️-🍉",
    8: "🔥-🌻",
    9: "🍁-📚",
    10: "🎃-🍂",
    11: "🍂-☕️",
    12: "🎄-⛄️",
  },
  region: {
    서울: "🏙️-🚌-🗼",
    부산: "🌊-🐟-⛴️",
    제주: "🌋-🍊-🌴",
    강원: "🏞️-⛷️-🏔️",
    경상: "🏯-🍶-🦀",
    전라: "🌾-🍚-🎶",
    충청: "🌄-🚞-🍑",
    인천: "🛫-🚢-🌁",
    대구: "🔥-🍜-🏟️",
    대전: "🧪-🚄-🏢",
    울산: "⚙️-🛠️-🚗",
    광주: "🎨-🕊️-🌳",
    세종: "🏛️-📚-📊",
    경기: "🏞️-🏙️-🚉",
    청주: "🏛️-📜-🍃",
    부산: "🌊-🐟-⛴️",
  },
  venue: "🏢-🏛️-🎪-🎫-🗓️-📍-📸-👥-🎤-📢-🛍️-📦-💡-✨-🧳-📣",
};

// 시간 관련 이모지 중 하나를 랜덤하게 반환합니다.
function getTimeEmoji() {
  return emoji.time.split("-")[Math.floor(Math.random() * 29)];
}

// 월(month)에 해당하는 이모지 2개 중 하나를 랜덤하게 반환합니다.
function getMonthEmoji(month) {
  const monthNumber = parseInt(month, 10);
  if (monthNumber >= 1 && monthNumber <= 12) {
    // 2개 이모지 중 하나를 랜덤하게 반환
    return emoji.month[monthNumber].split("-")[Math.floor(Math.random() * 2)];
  } else {
    return "❓";
  }
}

// 지역(region)명에 해당하는 이모지 3개 중 하나를 랜덤하게 반환합니다.
function getRegionEmoji(region) {
  const regionKey = region.replace(/[^가-힣]/g, "");
  if (emoji.region[regionKey]) {
    return emoji.region[regionKey].split("-")[Math.floor(Math.random() * 3)];
  } else {
    return "❓";
  }
}

// 행사장(venue) 관련 이모지 중 하나를 랜덤하게 반환합니다.
function getVenueEmoji(venue) {
  return emoji.venue.split("-")[Math.floor(Math.random() * 16)];
}

const clsColors = {
  blue: [
    "card-cyan",
    "card-blue",
    "card-blue2",
    "card-blue3",
    "card-blue4",
    "card-royalblue",
    "card-deepskyblue",
    "card-darkblue",
  ],
  green: ["card-green", "card-seagreen", "card-forestgreen", "card-teal-dark"],
  purple: [
    "card-lightpurple",
    "card-purple",
    "card-purple-light",
    "card-deeppurple",
    "card-violet",
  ],
  gold: [
    "card-amber",
    "card-mustard",
    "card-darkgold",
    "card-bronze",
    "card-darkyellow",
  ],
};

function getClsColor(color) {
  const colors = clsColors[color];
  if (colors) {
    const c = colors.shift();
    colors.push(c);
    return c;
  } else {
    return "card-blue";
  }
}
