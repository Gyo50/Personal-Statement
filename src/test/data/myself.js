import React from 'react'
import '../../App.css';
import './data.css';
import myimg from './dataimg/myimg.jpg';

export default function Myself() {
  return (
    <>
      <div className='flex mt-10'>
        <div className="basis-1/2 flex flex-col justify-be">
          <div className=''>
            <img src={myimg} className='w-48 h-auto rounded-3xl' alt="내 사진"/>
          </div>
          <div className='border-double'>
            <div className=''>
              <p className='myself_p'><span className='p_title'>이름</span> <br/>오영교</p>
              <p className='myself_p'><span className='p_title'>생년월일</span> <br/>1999년 8월 22일 (만 25세)</p>
              <p className='myself_p'><span className='p_title'>전화번호</span> <br/>010 - 8513 - 0528</p>
              <p className='myself_p'><span className='p_title'>이메일</span> <br/>oey157@nate.com</p>
              <p className='myself_p'><span className='p_title'>깃허브 주소</span> <br/><a className='underline' href='https://github.com/Gyo50'>https://github.com/Gyo50</a></p>
            </div>
          </div>
        </div>
        <div className='basis-1/2'>
          <p className='myself_p'><span className='p_title'>학력</span> <br/>국제대학교 전문학사 2018 ~ 2023 <br/>동양미래대학교 학사 2023 ~ 2024 </p>
          <p className='myself_p'><span className='p_title'>별명</span> <br/>소프트영 = 부드러운 성격과 학과명이 합쳐진 별명입니다</p>
          <p className='myself_p'><span className='p_title'>MBTI</span> <br/>ESFJ</p>
          <p className='myself_p'><span className='p_title'>성격</span> <br/>항상 긍정적이고 신중하게 계획하기 책임감을 느끼면서 꾸준히 노력하기</p>
          <p className='myself_p'><span className='p_title'>가치관</span> <br/>oey157@nate.com</p>
          <p className='myself_p'><span className='p_title'>인생모토</span> <br/>직업에서 행복을 찾아라 아니면 행복이 무엇인지 절대 모를것이다</p>
          <p className='myself_p'><span className='p_title'>취미</span> <br/>취미, 운동, 독서</p>
          <p className='myself_p'><span className='p_title'>목표</span> <br/>성장하고 배우면서 기억에 남는 사람이 되는 것</p>
        </div>
      </div>
    </>
  )
}
