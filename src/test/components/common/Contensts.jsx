import React from "react";

// 컨텐츠 컴포넌트
// import MyIntro from "../contents/myself";
// import Myskill from "../contents/myskill";
import Nexon from "../contents/nexon";
import Diptyque from "../contents/diptyque";
import Rolling from "../contents/rolling";
import Thejulge from "../contents/thejulge";
import Scm from "../contents/scm";
import Personal from "../contents/personal";

export const CARD_CONTENTS = [
  //   {
  //     title: "👤 나에 대해",
  //     detail: "Introduction",
  //     subText: "도전을 즐기는\n프론트엔드 개발자",
  //     extra: <MyIntro />,
  //   },
  //   {
  //     title: "💻 나의 스킬",
  //     detail: "Main SKill",
  //     subText: "스킬 소개",
  //     extra: <Myskill />,
  //   },
  {
    title: "📁 Personal",
    detail: "Personal",
    subText: "Personal Page",
    extra: <Personal />,
  },
  {
    title: "📁 넥슨 게임즈",
    detail: "넥슨 게임즈",
    subText: "Nexon Page",
    extra: <Nexon />,
  },
  {
    title: "📁 딥 디크",
    detail: "딥 디크",
    subText: "Diptyque Page",
    extra: <Diptyque />,
  },
  {
    title: "📁 롤링페이지",
    detail: "롤링페이지",
    subText: "Rolling Page",
    extra: <Rolling />,
  },
  {
    title: "📁 Thejulge",
    detail: "더 줄게",
    subText: "Thejulge Page",
    extra: <Thejulge />,
  },
  {
    title: "📁 SCM",
    detail: "SCM",
    subText: "S(study)\nC(cafe)\nM(map)",
    extra: <Scm />,
  },
];
export default CARD_CONTENTS;
