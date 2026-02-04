"use client";

import {
    ArrowLeft,
    Award,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock,
    Play,
    Star,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseInfoProps {
    category?: string;
    isBestSeller?: boolean;
    title: string;
    description: string;
    rating: number;
    ratingCount: number;
    studentCount: number;
    duration: string;
    instructor: string;
    thumbnailUrl: string;
    learningPoints: string[];
    curriculum: {
        sectionTitle: string;
        lectures: { title: string; duration: string }[];
    }[];
}

export default function CourseInfo({
    category = "프론트엔드",
    isBestSeller = true,
    title,
    description,
    rating,
    ratingCount,
    studentCount,
    duration,
    instructor,
    thumbnailUrl,
    learningPoints,
    curriculum,
}: CourseInfoProps) {
    const router = useRouter();

    const [expandedSections, setExpandedSections] = useState<number[]>([0]);

    const toggleSection = (index: number) => {
        setExpandedSections((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index],
        );
    };

    return (
        <section>
            <div
                className="flex items-center gap-3.5 cursor-pointer mb-8 hover:bg-[#1A1A20] w-fit px-3 py-2 rounded-md text-sm font-medium"
                onClick={() => router.back()}
            >
                <ArrowLeft size={14} />
                강의 목록으로
            </div>

            <div className="mb-3">
                <button className="h-5 px-2 text-primary text-[10px] font-medium cursor-default bg-primary/20 border-none rounded-md mr-2">
                    {category}
                </button>
                {isBestSeller && (
                    <button className="h-5 px-2 text-black text-[10px] font-medium cursor-default bg-[#FE9A00] border-none rounded-md">
                        베스트셀러
                    </button>
                )}
            </div>

            <h1 className="text-[26px] font-bold leading-8 mb-4">{title}</h1>

            <div className="text-secondary text-base leading-6 font-normal mb-4">
                {description}
            </div>

            <div className="flex items-center gap-5 text-sm font-semibold mb-3.5">
                <div className="flex items-center gap-1">
                    <Star className="fill-amber-500 text-amber-500 w-4 h-4" />
                    {rating} <span>({ratingCount.toLocaleString()}명)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="text-secondary w-4 h-4" />
                    {studentCount.toLocaleString()}명 수강중
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="text-secondary w-4 h-4" /> {duration}
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold mb-7">
                <Award className="w-4 h-4 text-primary" />
                {instructor}
            </div>

            <img
                src={thumbnailUrl}
                alt={title}
                className="rounded-xl w-full h-84 mb-7"
            />

            <div className="w-full p-5 bg-[#1a1a20] rounded-xl border border-[#2a2a35] mb-7">
                <h3 className="text-lg font-bold leading-6 mb-8">
                    이 강의를 통해 배우는 것
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    {learningPoints.map((point, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-sm leading-4"
                        >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            {point}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full p-5 bg-[#1a1a20] rounded-xl border border-[#2a2a35]">
                <h3 className="text-lg font-bold leading-6 mb-4">커리큘럼</h3>
                <div className="text-sm leading-6 font-normal text-secondary mb-8">
                    4개 섹션 • 15개 강의 • 24시간
                </div>

                <div className="flex flex-col gap-2.5">
                    {curriculum.map((section, sectionIndex) => (
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
                                            {section.sectionTitle}
                                        </h3>
                                        <p className="text-sm text-secondary">
                                            {section.lectures.length}개 강의
                                        </p>
                                    </div>
                                </div>
                            </button>

                            {expandedSections.includes(sectionIndex) && (
                                <div className="border-t border-[#2a2a35]">
                                    {section.lectures.map(
                                        (lesson, lessonIndex) => {
                                            return (
                                                <button
                                                    key={lessonIndex}
                                                    onClick={() =>
                                                        router.push(
                                                            "/course/player/1",
                                                        )
                                                    }
                                                    className="w-full p-4 cursor-pointer flex items-center justify-between transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Play className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                                                        <span className="text-sm group-hover:text-primary transition-colors">
                                                            {lesson.title}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-secondary">
                                                        {lesson.duration}
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
