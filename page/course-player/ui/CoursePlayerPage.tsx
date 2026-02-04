"use client";

import { ArrowLeft, Clock, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const curriculum = [
    {
        sectionTitle: "React 기초 다지기",
        lectures: [
            { title: "React 소개 및 개발 환경 설정", duration: "1시간" },
            { title: "JSX와 컴포넌트 기초", duration: "2시간" },
            { title: "Props와 State 이해하기", duration: "1.5시간" },
        ],
    },
    {
        sectionTitle: "고급 React 기능",
        lectures: [
            { title: "Hooks 완전 정복", duration: "3시간" },
            { title: "Context API로 전역 상태 관리", duration: "2시간" },
            { title: "Redux 기초 및 활용", duration: "2.5시간" },
        ],
    },
    {
        sectionTitle: "실전 프로젝트",
        lectures: [
            { title: "프로젝트 1: Todo 앱 만들기", duration: "3시간" },
            { title: "프로젝트 2: 블로그 플랫폼 개발", duration: "4시간" },
            { title: "프로젝트 3: E-commerce 사이트 구축", duration: "5시간" },
        ],
    },
];

export default function CoursePlayerPage() {
    const router = useRouter();

    return (
        <div className="bg-background text-white">
            <header className="p-3.5 border-b border-[#2A2A35] flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-[#1A1A20] w-fit px-3 py-2 rounded-md"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <div className="text-sm font-medium">강의 목록으로</div>
                    </div>

                    <h1 className="text-base font-semibold leading-5">
                        React 완벽 마스터: 기초부터 실전 프로젝트까지
                        <div className="text-sm font-normal text-secondary">
                            코딩하는 대머리
                        </div>
                    </h1>
                </div>

                <div className="flex items-center gap-3.5">
                    <div className="text-sm font-normal leading-4 text-secondary">
                        진행률:&nbsp;
                        <span className="font-semibold text-primary">40%</span>
                    </div>

                    <div className="relative rounded-full bg-[#2a2a35] w-28 h-2">
                        <div className="absolute top-0 left-0 w-12 h-full bg-primary rounded-full"></div>
                    </div>
                </div>
            </header>

            <div className="flex">
                <section className="flex-1 flex overflow-hidden">
                    {/* Main Video Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Video Player */}
                        <div className="bg-black aspect-video w-full">
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                        <Play className="w-10 h-10 text-primary" />
                                    </div>
                                    <p className="text-white text-lg mb-2">
                                        Props와 State
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        강의 시간: 25분
                                    </p>
                                    <p className="text-gray-500 text-xs mt-4">
                                        실제 환경에서는 비디오가 재생됩니다
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Video Controls & Info */}
                        <div className="p-6 space-y-6">
                            {/* Lesson Title & Actions */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-transparent border border-[#2a2a35] px-2 py-0.5 rounded-md">
                                            React 기초
                                        </div>
                                        <span className="text-sm text-secondary">
                                            1 / 10
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">
                                        Props와 State
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-secondary">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>25분</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="w-84 h-screen sticky top-0 border-l border-[#2A2A35]">
                    <div className="p-3.5 border-b border-[#2A2A35]">
                        <h3 className="text-sm leading-5 font-semibold mb-0.5">
                            커리큘럼
                        </h3>
                        <div className="text-xs leading-4 font-normal text-secondary">
                            0/15 강의 완료
                        </div>
                    </div>

                    <div className="p-3.5 flex flex-col gap-3.5">
                        {curriculum.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <div className="mb-2">
                                    {section.sectionTitle}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {section.lectures.map(
                                        (lecture, lectureIndex) => (
                                            <div
                                                className={`p-3 flex items-start gap-2 cursor-pointer rounded-lg transition-colors ${lecture.title === "React 소개 및 개발 환경 설정" ? "bg-primary/20 border border-primary hover:bg-primary/30" : "hover:bg-[#2a2a35]"}`}
                                                key={lectureIndex}
                                            >
                                                <Play
                                                    className={`w-4 h-4 inline-block mr-2 ${lecture.title === "React 소개 및 개발 환경 설정" ? "text-primary" : ""}`}
                                                />

                                                <div>
                                                    <div
                                                        className={`text-sm leading-4 mb-1 ${lecture.title === "React 소개 및 개발 환경 설정" ? "text-primary" : ""}`}
                                                    >
                                                        {lecture.title}
                                                    </div>
                                                    <div className="text-xs text-secondary">
                                                        {lecture.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
