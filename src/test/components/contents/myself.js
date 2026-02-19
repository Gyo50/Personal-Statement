import React from 'react';
import profileimg from '../../assets/images/profileimg.jpg';

export default function Myself({ isDark }) {
  return (
    <div className="flex flex-col md:flex-row gap-12 items-start">
      <div className="basis-2/5 flex flex-col items-center w-full">
        <div className="relative group">
          <div className={`absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[60px] blur-lg opacity-40 group-hover:opacity-100 transition duration-700`}></div>
          
          <img 
            src={profileimg} 
            className='relative w-56 h-full object-cover rounded-[50px] border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]' 
            alt="오영교 프로필"
          />
        </div>

        <div className='mt-10 space-y-5 w-full bg-opacity-10 rounded-2xl p-4'>
          <InfoItem label="이름" value="오영교" isDark={isDark} />
          <InfoItem label="생년월일" value="1999년 8월 22일" isDark={isDark} />
          <InfoItem label="전화번호" value="010 - 8513 - 0528" isDark={isDark} />
          <InfoItem label="이메일" value="oey157@nate.com" isDark={isDark} />
          <div className="text-left">
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Github</span>
            <br />
            <a href="https://github.com/Gyo50" target="_blank" rel="noreferrer" className="text-sm underline break-all opacity-80 hover:opacity-100">
              github.com/Gyo50
            </a>
          </div>
        </div>
      </div>

      {/* 오른쪽: 상세 정보 카드 스타일 */}
      <div className='basis-3/5 grid grid-cols-1 gap-4 w-full'>
        <DetailCard title="🎓 학력" isDark={isDark}>
          국제대학교 전문학사 (2018 ~ 2023)<br/>
          동양미래대학교 학사 (2023 ~ 2024)
        </DetailCard>
        
        <DetailCard title="✨ 별명" isDark={isDark}>
          <span className="font-semibold text-blue-400">소프트영:</span> 부드러운 성격과 학과명이 합쳐진 이름입니다.
        </DetailCard>
        <DetailCard title="💼 경력" isDark={isDark}>
          <div className="mb-2">
            <span className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              (주) 모렌비
            </span>
            <span className="ml-2 text-xs opacity-80">
              (2025.05 ~ 2025.08)
            </span>
          </div>
          <div className="mt-2">
            <span className="font-semibold opacity-90">주요 업무</span>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>카페24 기반 쇼핑몰 구축 및 유지보수</li>
              <li>HTML, CSS, JavaScript를 활용한 신규 페이지 제작 및 기능 개선</li>
              <li>Figma 디자인 시안 기반 퍼블리싱 및 UI 구현</li>
              <li>고객 요구사항 분석 후 기능 추가 및 사이트 커스터마이징</li>
              <li>운영 중 오류 수정 및 서비스 안정화 작업 수행</li>
            </ul>
          </div>
        </DetailCard>

        <div className="grid grid-cols-2 gap-4">
          <DetailCard title="🧠 MBTI" isDark={isDark}>ESFJ</DetailCard>
          <DetailCard title="🎨 취미" isDark={isDark}>운동, AI로 개발 다양한 재미 붙이기</DetailCard>
        </div>

        <DetailCard title="🤝 성격 및 가치관" isDark={isDark}>
          긍정적이고 신중한 계획파입니다. 책임감을 가지고 꾸준히 노력하는 것을 가치 있게 생각합니다.
        </DetailCard>

        <DetailCard title="💡 인생 모토" isDark={isDark}>
          <p className="italic font-serif">"직업에서 행복을 찾아라. 아니면 행복이 무엇인지 절대 모를 것이다."</p>
        </DetailCard>

        <DetailCard title="🚀 목표" isDark={isDark}>
          끊임없이 성장하여 타인의 기억에 남는 개발자가 되는 것
        </DetailCard>
      </div>
    </div>
  );
}

// 가독성을 위한 내부 컴포넌트
function InfoItem({ label, value, isDark }) {
  return (
    <div className="text-left border-b border-gray-500/10 pb-2">
      <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{label}</span>
      <p className="text-sm font-medium opacity-90">{value}</p>
    </div>
  );
}

function DetailCard({ title, children, isDark }) {
  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
      <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>{title}</h4>
      <div className="text-sm leading-relaxed opacity-80">{children}</div>
    </div>
  );
}