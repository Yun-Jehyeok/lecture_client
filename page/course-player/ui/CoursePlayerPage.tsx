"use client";

import { CourseProgress } from "@/entities/course/model/types";
import { getLesson } from "@/entities/course";
import { CurriculumSectionWithRelations, Lesson } from "@/shared/types";
import { ArrowLeft, Clock, Play } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import YoutubePlayer from "./YoutubePlayer";

export default function CoursePlayerPage({
    courseId,
    curriculumns,
    progress,
    lesson,
}: {
    courseId: string;
    curriculumns: CurriculumSectionWithRelations[];
    progress: CourseProgress;
    lesson: Lesson;
}) {
    const router = useRouter();
    const lesson_id = useSearchParams().get("lesson") || "1"; // URL에서 lessonId 쿼리 파라미터 가져오기

    const [currentLesson, setCurrentLesson] = useState<Lesson>(lesson); // 현재 선택된 강의 (초기 값은 첫 번째 강의)

    const [currentSection, setCurrentSection] =
        useState<CurriculumSectionWithRelations>(curriculumns[0]!); // 현재 선택된 섹션 (초기 값은 첫 번째 섹션)
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false); // 비디오 재생 상태

    // 비디오 플레이 버튼 클릭 시, 비디오 재생 상태를 true로 변경하여 iframe을 렌더링하도록 함
    const handlePlayVideo = () => {
        setIsVideoPlaying(true);
    };

    // 커리큘럼에서 강의를 클릭했을 때, 해당 강의로 currentLesson을 업데이트하는 함수
    const handleVideoClick = async (lessonId: string) => {
        setIsVideoPlaying(false); // 비디오 재생 상태 초기화
        router.push(`/course/player/${courseId}?lesson=${lessonId}`); // URL 업데이트
    };

    const [isFirstLoad, setIsFirstLoad] = useState(true);
    // lesson_id가 변경될 때마다 해당 강의 정보를 불러와 currentLesson과 currentSection을 업데이트 => 개선 필요
    useEffect(() => {
        const loadLesson = async () => {
            const lesson = await getLesson({ lessonId: lesson_id! });
            setCurrentLesson(lesson);
            const selectedSection = curriculumns.find((section) =>
                section.lessons.some((lesson) => lesson.id === lesson_id),
            )!;
            setCurrentSection(selectedSection);

            setIsVideoPlaying(false);
        };

        // 나중에 개선 필요
        if (isFirstLoad) {
            if (lesson_id !== "1") {
                loadLesson();
            }
        } else {
            loadLesson();
        }

        setIsFirstLoad(false);
    }, [lesson_id]);

    return (
        <div className="bg-background text-white min-h-screen">
            <header className="p-3.5 border-b border-[#2A2A35] flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                <div className="flex items-start md:items-center gap-3 md:gap-5">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:bg-[#1A1A20] w-fit px-3 py-2 rounded-md"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <div className="text-xs sm:text-sm font-medium">
                            강의 목록으로
                        </div>
                    </div>

                    <h1 className="text-sm sm:text-base font-semibold leading-5 wrap-break-word">
                        {currentLesson.title}
                        <div className="text-xs sm:text-sm font-normal text-secondary">
                            코딩하는 빡빡이
                        </div>
                    </h1>
                </div>

                <div className="flex items-center gap-3.5 w-full md:w-auto">
                    <div className="text-xs sm:text-sm font-normal leading-4 text-secondary shrink-0">
                        진행률:&nbsp;
                        <span className="font-semibold text-primary">
                            {progress.progressPercentage}%
                        </span>
                    </div>

                    <div className="relative rounded-full bg-[#2a2a35] flex-1 md:w-28 h-2">
                        <div
                            className="absolute top-0 left-0 h-full bg-primary rounded-full"
                            style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row">
                <section className="flex-1 flex overflow-hidden min-w-0">
                    {/* Main Video Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Video Player */}
                        <div className="bg-black aspect-video w-full relative">
                            <YoutubePlayer
                                videoId={
                                    currentLesson.videoUrl
                                        .split("/embed/")[1]
                                        .split("?")[0]
                                }
                                lessonId={currentLesson.id}
                                startTime={currentLesson.watchTimeSeconds}
                                isPlaying={isVideoPlaying}
                            />

                            {!isVideoPlaying ? (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
                                    <div className="text-center">
                                        <div
                                            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 cursor-pointer"
                                            onClick={handlePlayVideo}
                                        >
                                            <Play className="w-10 h-10 text-primary" />
                                        </div>
                                        <p className="text-white text-lg mb-2">
                                            {currentLesson.title}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            강의 시간:{" "}
                                            {currentLesson.durationMinutes}분
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Video Controls & Info */}
                        <div className="p-4 sm:p-6 space-y-6">
                            {/* Lesson Title & Actions */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <div className="bg-transparent border border-[#2a2a35] px-2 py-0.5 rounded-md">
                                            {currentSection.title}
                                        </div>
                                        <span className="text-sm text-secondary">
                                            {lesson_id} /{" "}
                                            {progress.totalLessons}
                                        </span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 wrap-break-word">
                                        {currentLesson.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-secondary flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>
                                                {currentLesson.durationMinutes}
                                                분
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-md text-white mt-8 bg-[#1A1A20] p-4 rounded-lg">
                                        {currentLesson.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="w-full lg:w-84 lg:min-h-screen lg:sticky lg:top-0 border-t lg:border-t-0 lg:border-l border-[#2A2A35]">
                    <div className="p-3.5 border-b border-[#2A2A35]">
                        <h3 className="text-sm leading-5 font-semibold mb-0.5">
                            커리큘럼
                        </h3>
                        <div className="text-xs leading-4 font-normal text-secondary">
                            {progress.completedLessons}/{progress.totalLessons}{" "}
                            강의 완료
                        </div>
                    </div>

                    <div className="p-3.5 flex flex-col gap-3.5 max-h-[50vh] lg:max-h-none overflow-y-auto">
                        {curriculumns.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <div className="mb-2">{section.title}</div>
                                <div className="flex flex-col gap-1.5">
                                    {section.lessons.map(
                                        (lesson, lessonIndex) => (
                                            <div
                                                className={`p-3 flex items-start gap-2 cursor-pointer rounded-lg transition-colors ${lesson.id === lesson_id ? "bg-primary/20 border border-primary hover:bg-primary/30" : "hover:bg-[#2a2a35]"}`}
                                                key={lessonIndex}
                                                onClick={() => {
                                                    handleVideoClick(lesson.id);
                                                }}
                                            >
                                                <Play
                                                    className={`w-4 h-4 inline-block mr-2 ${lesson.id === lesson_id ? "text-primary" : ""}`}
                                                />

                                                <div>
                                                    <div>
                                                        <div
                                                            className={`text-sm leading-4 mb-1 ${lesson.id === lesson_id ? "text-primary" : ""}`}
                                                        >
                                                            {lesson.title}
                                                        </div>
                                                        <div className="text-xs text-secondary">
                                                            {
                                                                lesson.durationMinutes
                                                            }
                                                            분
                                                        </div>
                                                    </div>
                                                    {lesson.watchTimeSeconds}
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
