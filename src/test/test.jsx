import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RainEffect from "./raineffect";
import Paper from "./components/Paper";
import Modal from "./components/common/Modal";

// Test.jsx (상대 경로 확인: Test.jsx가 src/test 폴더에 있다면)
import Aboutme from './assets/images/Aboutme.png';
import Myskillimg from './assets/images/myskill.png';
import Nexonimg from './assets/images/Nexon.png';
import DiptyqueImg from './assets/images/diptyque.png';
import Defaultimg from './assets/images/Default.png';

// 컨텐츠 컴포넌트
import MyIntro from "../test/components/contents/myself";
import Myskill from "../test/components/contents/myskill";
import Nexon from "../test/components/contents/nexon";
import Diptyque from "../test/components/contents/diptyque";

const Test = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: "", extra: null });
  const [starSpeed, setStarSpeed] = useState(0.5);

  const contents = [
    { title: "👤 나에 대해", extra: <MyIntro />, image: Aboutme },
    { title: "💻 나의 스킬", extra: <Myskill />, image: Myskillimg },
    { title: "📁 넥슨 게임즈", extra: <Nexon />, image: Nexonimg },
    { title: "📁 딥 디크", extra: <Diptyque />, image: DiptyqueImg },
    { title: "📁 SCM", image: Defaultimg, extra: (
        <div className="text-center py-10">
          <p className="font-bold">프로젝트 완료 후 작성 예정(2월)</p>
          <p className="text-sm opacity-60 mt-2">SCM(study cafe map) 개발 중</p>
        </div>
      )
    },
  ];

  const handlePaperClick = (index) => {
    setPopupData(contents[index]);
    setPopupVisible(true);
  };

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* 컨트롤러 유틸리티 UI */}
      <div className="absolute top-8 left-8 z-[100] p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-52">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[11px] font-bold text-gray-400 tracking-widest uppercase">
            <span>Star Speed</span>
            <span className="text-white">{Number(starSpeed).toFixed(1)}x</span>
          </div>
          <input 
            type="range" min="0" max="10" step="0.1" 
            value={starSpeed} 
            onChange={(e) => setStarSpeed(e.target.value)}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>
      </div>

      <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RainEffect speed={starSpeed}/>
        
        {/* 씬 내 카드들 */}
        <group>
          {contents.map((content, i) => (
            <Paper 
              key={i} index={i} 
              image={content.image} 
              onClick={handlePaperClick} 
              totalCards={contents.length} 
            />
          ))}
        </group>

        <OrbitControls enableDamping dampingFactor={0.1} enableZoom={false} enablePan={false} />
      </Canvas>

      <Modal
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title={popupData.title}
        extra={popupData.extra}
      />
    </div>
  );
};

export default Test;