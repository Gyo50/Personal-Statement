import React from 'react'

function Nexon() {
    return (
        <div>
            <div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 w-[40px] font-semibold">
                        설명:
                    </span>
                    <p className="flex-1 break-words">
                        넥슨게임즈 페이지를 보면서 저만의 생각으로 만든 페이지로 Photoshop을 이용하여 구상 및 이미지들을 만들었으며, ...
                    </p>
                </div>
                <div className='flex items-center justify-start gap-2'>
                    <span className='font-semibold'>기술:</span>
                    <div className='flex items-center gap-3'>
                        <img alt='Html' src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" />
                        <img alt='CSS' src="https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white" />
                        <img alt='JS' src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
                    </div>
                </div>
                <a href="https://gyo50.github.io/Nexon.github.io/" target="_blank" rel="noopener noreferrer">👉 데모 보기</a>
            </div>
        </div>
    )
}

export default Nexon