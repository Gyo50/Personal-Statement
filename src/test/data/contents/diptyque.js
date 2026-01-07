import React from 'react'

function Diptyque() {
    return (
        <div>
            <div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 w-[40px] font-semibold">
                        설명:
                    </span>
                    <p className="flex-1 break-words">
                        딥디크 향수에 대한 Micro 페이지로 1920px로만으로 이루어져 있으며 외국의 엘레베이터 형식의 페이지를 본 받아서 비슷한 페이지를 구현하고 싶다는 마음으로 제가 좋아하는 향수를 기반삼아서 만든 페이지
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
                <a href="https://gyo50.github.io/Micro.github.io/" target="_blank" rel="noopener noreferrer">👉 데모 보기</a>
            </div>
        </div>
    )
}

export default Diptyque