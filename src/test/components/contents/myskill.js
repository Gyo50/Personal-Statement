import React, { useState, useEffect } from 'react';

export default function Myskill({ isDark }) {
    // 모달이 뜰 때 애니메이션을 시작하기 위한 상태
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // 컴포넌트 마운트 후 짧은 지연시간 뒤 애니메이션 시작
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 스킬 데이터 정의 (이미지 주소와 숙련도 %)
    const skillData = {
        Frontend: [
            { name: 'HTML5', percentage: 90, badge: "https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white" },
            { name: 'CSS3', percentage: 85, badge: "https://img.shields.io/badge/css-1572B6?style=flat-square&logo=css3&logoColor=white" },
            { name: 'JS', percentage: 80, badge: "https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" },
            { name: 'jQuery', percentage: 65, badge: "https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jquery&logoColor=white" },
            { name: 'React', percentage: 75, badge: "https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" },
            { name: 'Next.js', percentage: 60, badge: "https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" },
            { name: 'Tailwind CSS', percentage: 70, badge: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" },
            { name: 'TypeScript', percentage: 65, badge: "https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" },                                                    
        ],
        Backend: [
            { name: 'Java', percentage: 60, badge: "https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white" },
            { name: 'Node.js', percentage: 60, badge: "https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" },
            { name: 'Python', percentage: 45, badge: "https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" },
            { name: 'C++', percentage: 50, badge: "https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white" },
            { name: 'C#', percentage: 55, badge: "https://img.shields.io/badge/-C%23-239120?style=flat-square&logo=c-sharp&logoColor=white" },
        ],
        Database: [
            { name: 'MySQL', percentage: 55, badge: "https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white" },
            { name: 'MongoDB', percentage: 60, badge: "https://img.shields.io/badge/-MongoDB-13aa52?style=flat-square&logo=mongodb&logoColor=white" },
        ]
    };

    return (
        <div className={`space-y-8 p-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {Object.entries(skillData).map(([category, skills]) => (
                <div key={category} className="animate-fadeIn">
                    <h3 className={`text-lg font-bold mb-4 pl-3 underline-offset-4 ${isDark ? 'text-blue-400 underline' : 'text-blue-600 underline'}`}>
                        {category}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill) => (
                            <div key={skill.name} className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <img src={skill.badge} alt={skill.name} className="h-5" />
                                    <span className="text-xs font-mono">{animate ? skill.percentage : 0}%</span>
                                </div>
                                {/* 프로그래스 바 배경 */}
                                <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                    {/* 실제 차오르는 바 */}
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}
                                        style={{
                                            width: animate ? `${skill.percentage}%` : '0%',
                                            boxShadow: isDark ? '0 0 10px rgba(96, 165, 250, 0.5)' : 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}