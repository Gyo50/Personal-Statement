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
import Coworkers from "../contents/coworkers";

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
    subText: "포트폴리오 모음\n홈페이지",
    extra: <Personal />,
  },
  {
    title: "📁 넥슨 게임즈",
    detail: "넥슨 게임즈",
    subText: "넥슨 게임즈\n클론 홈페이지",
    extra: <Nexon />,
  },
  {
    title: "📁 딥 디크",
    detail: "딥 디크",
    subText: "딥 디크 백화점\nMicro 홈페이지",
    extra: <Diptyque />,
  },
  {
    title: "📁 롤링페이지",
    detail: "롤링페이지",
    subText: "롤링페이퍼를\n구현한 홈페이지",
    extra: <Rolling />,
  },
  {
    title: "📁 Thejulge",
    detail: "더 줄게",
    subText: "알바 구인구직\n홈페이지",
    extra: <Thejulge />,
  },
  {
    title: "📁 SCM",
    detail: "SCM",
    subText: "카공하기 위해\n카페 찾는 홈페이지",
    extra: <Scm />,
  },
  {
    title: "📁 Coworkers",
    detail: "Coworkers",
    subText: "팀단위로 투두리스트를\n관리하는 홈페이지",
    extra: <Coworkers />,
  },
];
export default CARD_CONTENTS;
