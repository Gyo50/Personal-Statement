import React from 'react'
// 프로젝트 이름, 소개, 주요 기능, 사용 기술, 개발 배경. 배운 점, 배포링크
function Nexon() {
    return (
        <div>
            <div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 max-w-[100px] font-semibold">
                        소개:
                    </span>
                    <p className="flex-1 break-words m-0">
                        넥슨게임즈 웹 사이트를 보면서 여러 디자인을 바꾼 나만의 넥슨 게임즈 웹 사이트
                    </p>
                </div>
                <div className='flex items-center justify-start gap-2 mb-[10px]'>
                    <span className='font-semibold'>기술:</span>
                    <div className='flex items-center gap-3'>
                        <img alt='Html' src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" />
                        <img alt='CSS' src="https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white" />
                        <img alt='JS' src="https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 max-w-[100px] font-semibold m-0">
                        개발 배경:
                    </span>
                    <p className="flex-1 break-words">
                        기존에는 넥슨 홈페이지를 만들고 싶었으나 넥슨의 홈페이지는 웹 사이트의 기능적인 부분보다 게임의 소개 부분들이 더 많다고 느껴서 넥슨 게임즈라는 소개 사이트를 통해 웹 사이트에 기능을 넣어서 만들어봤습니다.
                    </p>
                </div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 max-w-[100px] font-semibold">
                        배운 점:
                    </span>
                    <p className="flex-1 break-words">
                        이 프로젝트는 제가 처음으로 개발한 웹사이트로, 웹 개발의 전반적인 흐름을 실습하며 기초를 탄탄히 다질 수 있었던 계기였습니다.
                        <br/>개발 과정에서 HTML의 시멘틱 구조와 태그의 역할에 대해 깊이 이해하게 되었고, CSS를 이용한 다양한 스타일링 방법을 실제로 구현해보며 시각적인 완성도를 높였습니다.
                        <br/>또한, JavaScript를 통해 사용자 인터랙션을 세밀하게 제어하는 방법을 익히면서, 단순한 정적 페이지가 아닌 동적인 기능 구현에 대한 감각을 키울 수 있었습니다.
                        <br/>처음이라 어려움도 많았지만, 기초부터 하나하나 쌓아가는 과정 자체가 매우 의미 있었고, 이후 더 복잡한 프로젝트에 도전할 수 있는 자신감의 발판이 되었습니다.
                    </p>
                </div>
                <a href="https://gyo50.github.io/Nexon.github.io/" target="_blank" rel="noopener noreferrer">👉 데모 보기</a>
            </div>
        </div>
    )
}

export default Nexon