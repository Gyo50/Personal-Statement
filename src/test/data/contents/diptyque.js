import React from 'react'

function Diptyque() {
    return (
        <div>
            <div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 max-w-[100px] font-semibold">
                        소개:
                    </span>
                    <p className="flex-1 break-words m-0">
                        딥 디크 회사를 마이크로 사이트로 구현한 웹 사이트
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
                        웹 사이트를 검색하던 도중에 해외 사이트중에서 백화점 내부를 사이트로 다루는 사이트를 접하게 되면서 딥 디크의 향수를 백화점 형식으로 하고 싶다는 생각이 들어서 만들게 된 사이트이다.
                    </p>
                </div>
                <div className="flex items-start gap-2">
                    <span className="shrink-0 max-w-[100px] font-semibold">
                        배운 점:
                    </span>
                    <p className="flex-1 break-words">
                        이미 한 차례 웹사이트를 만들어본 경험이 있었기 때문에, HTML 구조 설계에 대한 큰 어려움은 없었고, 전체 레이아웃을 보다 체계적으로 구성할 수 있었습니다.
                        <br/>CSS 부분에서는 기존보다 한 단계 더 나아가 애니메이션과 새로운 디자인 요소들을 적극적으로 적용해보며, 사용자 경험을 향상시키는 스타일링에 대해 더 깊이 이해하게 되었습니다. 단순한 스타일 적용을 넘어, 시각적인 흐름과 인터랙션을 고려한 디자인을 고민하는 계기가 되었습니다.
                        <br/>특히 이번 프로젝트에서는 JavaScript 사용 비중을 이전보다 크게 늘리면서, 기능 구현 과정에서 부분적으로 어려움도 있었지만, 다양한 시도와 시행착오를 거치며 문제를 해결하는 나만의 방법을 찾을 수 있었습니다. 그 과정에서 JavaScript의 동작 원리와 활용 방식에 대한 이해도가 높아졌고, 보다 능동적으로 기능을 구현할 수 있게 되었습니다.
                    </p>
                </div>
                <a href="https://gyo50.github.io/Nexon.github.io/" target="_blank" rel="noopener noreferrer">👉 데모 보기</a>
            </div>
        </div>
    )
}

export default Diptyque