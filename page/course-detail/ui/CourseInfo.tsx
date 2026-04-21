"use client";

import { useUser } from "@/shared/hooks";
import {
    CourseWithRelations,
    CurriculumSectionWithRelations,
} from "@/shared/types";
import {
    ArrowLeft,
    Award,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock,
    Play,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseInfo({
    course,
    curriculumns,
}: {
    course: CourseWithRelations;
    curriculumns: CurriculumSectionWithRelations[];
}) {
    const router = useRouter();
    const { user } = useUser(); // 사용자 정보 가져오기

    const [expandedSections, setExpandedSections] = useState<number[]>([0]);

    const toggleSection = (index: number) => {
        setExpandedSections((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    return (
        <section className="flex-1 min-w-0">
            <div
                className="flex items-center gap-3.5 cursor-pointer mb-5 sm:mb-8 hover:bg-[#1A1A20] w-fit px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => router.back()}
            >
                <ArrowLeft size={14} />
                강의 목록으로
            </div>

            <div className="mb-3">
                <button className="h-5 px-2 text-primary text-[10px] font-medium cursor-default bg-primary/20 border-none rounded-md mr-2">
                    {course.category.name}
                </button>
                {course.isBestseller && (
                    <button className="h-5 px-2 text-black text-[10px] font-medium cursor-default bg-[#FE9A00] border-none rounded-md">
                        베스트셀러
                    </button>
                )}
            </div>

            <h1 className="text-2xl sm:text-[26px] font-bold leading-8 mb-4 wrap-break-word">
                {course.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm font-semibold mb-3.5">
                {/* <div className="flex items-center gap-1">
                    <Star className="fill-amber-500 text-amber-500 w-4 h-4" />
                    {course.rating}{" "}
                    <span>({course.totalStudents.toLocaleString()}명)</span>
                </div> */}
                <div className="flex items-center gap-1">
                    <Users className="text-secondary w-4 h-4" />
                    {course.totalStudents.toLocaleString()}명 수강중
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="text-secondary w-4 h-4" />{" "}
                    {course.durationHours}시간
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold mb-7">
                <Award className="w-4 h-4 text-primary" />
                {course.instructorName}
            </div>

            <img
                src={course.imageUrl || "https://via.placeholder.com/1200x300"}
                alt={course.title}
                className="rounded-xl w-full h-52 sm:h-84 object-cover mb-7"
            />

            <div
                className="text-white text-base leading-6 font-normal my-8 p-8 bg-[#1a1a20] rounded-xl border border-[#2a2a35]"
                dangerouslySetInnerHTML={{ __html: course.description }}
            />

            <div className="w-full p-4 sm:p-5 bg-[#1a1a20] rounded-xl border border-[#2a2a35] mb-7">
                <h3 className="text-lg font-bold leading-6 mb-8">
                    이 강의를 통해 배우는 것
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.learningPoints.map((point, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-sm leading-4"
                        >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            {point.description}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full p-4 sm:p-5 bg-[#1a1a20] rounded-xl border border-[#2a2a35]">
                <h3 className="text-lg font-bold leading-6 mb-4">커리큘럼</h3>
                <div className="text-sm leading-6 font-normal text-secondary mb-8">
                    4개 섹션 • 15개 강의 • 24시간
                </div>

                <div className="flex flex-col gap-2.5">
                    {curriculumns.map((section, sectionIndex) => (
                        <div
                            key={sectionIndex}
                            className="bg-transparent border border-[#2a2a35] rounded-xl"
                        >
                            <button
                                onClick={() => toggleSection(sectionIndex)}
                                className={`w-full p-4 flex items-center justify-between cursor-pointer hover:bg-[#2a2a35] transition-colors ${
                                    expandedSections.includes(sectionIndex)
                                        ? "rounded-t-xl"
                                        : "rounded-xl"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {expandedSections.includes(sectionIndex) ? (
                                        <ChevronUp className="w-5 h-5 text-secondary" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-secondary" />
                                    )}
                                    <div className="text-left">
                                        <h3 className="font-semibold">
                                            {section.title}
                                        </h3>
                                        <p className="text-sm text-secondary">
                                            {section.lessons.length}개 강의
                                        </p>
                                    </div>
                                </div>
                            </button>

                            {expandedSections.includes(sectionIndex) && (
                                <div className="border-t border-[#2a2a35]">
                                    {section.lessons.map(
                                        (lesson, lessonIndex) => {
                                            return (
                                                <button
                                                    key={lessonIndex}
                                                    onClick={() => {
                                                        if (!user) {
                                                            alert(
                                                                "로그인이 필요한 서비스입니다.",
                                                            );
                                                            return;
                                                        }

                                                        router.push(
                                                            `/course/player/${course.id}?lesson=${lesson.id}`,
                                                        );
                                                    }}
                                                    className="w-full p-4 cursor-pointer flex items-start justify-between gap-3 transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Play className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                                                        <span className="text-sm group-hover:text-primary transition-colors text-left wrap-break-word">
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-secondary">
                                                        {lesson.durationMinutes}
                                                        분
                                                    </span>
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
