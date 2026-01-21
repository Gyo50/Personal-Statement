import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RainEffect from "./raineffect";
import Paper from "./components/Paper";
import Modal from "./components/common/Modal";
import { CARD_CONTENTS } from "./components/common/Contensts"; // 데이터 임포트

const Test = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState({ title: "", extra: null });
  const [starSpeed, setStarSpeed] = useState(0.5);

  const handlePaperClick = (index) => {
    setPopupData(CARD_CONTENTS[index]);
    setPopupVisible(true);
  };

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      <div className="absolute top-8 left-8 z-[100] p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-52">
        <div className="flex flex-col gap-2 text-white">
          <div className="flex justify-between text-[11px] font-bold text-gray-400 tracking-widest uppercase">
            <span>Star Speed</span>
            <span>{Number(starSpeed).toFixed(1)}x</span>
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
        
        <group>
          {CARD_CONTENTS.map((content, i) => (
            <Paper 
              key={i} 
              index={i}
              text={content.detail}
              subText={content.subText} // 텍스트 추가 전달
              image={content.image}
              onClick={handlePaperClick} 
              totalCards={CARD_CONTENTS.length} 
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