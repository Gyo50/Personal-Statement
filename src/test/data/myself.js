import React from 'react'
import '../../App.css';
import './data.css';
import myimg from './dataimg/myimg.jpg';

export default function Myself() {
  return (
    <>
      <div className="flex mt-10 justify-around items-center">
        <div>
          <img src={myimg} alt="내 사진" className="w-48 h-auto rounded-3xl p-4" />
        </div>
        <div className='border-double'>
          <div className=''>
            <p>이름: 오영교</p>
            <p>생년월일: 1999년 8월 22일 (만 25세)</p>
            <p>전화번호: 010 - 8513 - 0528</p>
            <p>이메일: oey157@nate.com</p>
            <p>깃허브 주소: <a className='text-' href='https://github.com/Gyo50'>https://github.com/Gyo50</a></p>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

