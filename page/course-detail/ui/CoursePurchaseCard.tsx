"use client";

import { enrollCourse } from "@/entities/course";
import { useTrackedRouter, useUser } from "@/shared/hooks";
import { useEffect, useState } from "react";
import PurchaseSuccessModal from "./PurchaseSuccessModal";
import { useCheckEnrollment } from "../hooks/useCheckEnrollment";

interface CoursePurchaseCardProps {
    courseId: string;
    originalPrice: number;
    currentPrice: number;
    discountRate: number;
    duration: number;
    accessPeriod: string;
    lectureCount: number;
}

export default function CoursePurchaseCard({
    courseId,
    originalPrice,
    currentPrice,
    discountRate,
    duration,
    accessPeriod,
    lectureCount,
}: CoursePurchaseCardProps) {
    const router = useTrackedRouter();

    const { user } = useUser(); // 사용자 정보 가져오기
    const { isEnrolled, isLoading, durationMs } = useCheckEnrollment(
        user,
        courseId,
    ); // 수강 신청 여부 확인

    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

    useEffect(() => {
        if (durationMs === null) {
            return;
        }

        console.info("Enrollment check completed", {
            courseId,
            isEnrolled,
            isLoading,
            durationMs,
        });
    }, [courseId, durationMs, isEnrolled, isLoading]);

    /**
     * 강의 신청
     */
    const handleEnrollCourse = async () => {
        try {
            if (!user) {
                alert("로그인이 필요한 서비스입니다.");
                return;
            }

            if (isEnrolled) {
                alert("이미 수강 중인 강의입니다.");
                return;
            }

            const response = await enrollCourse(courseId);

            if (!response) {
                alert("강의 신청에 실패했습니다. 다시 시도해주세요.");
                return;
            }

            setIsOpenSuccessModal(true);
        } catch (err) {
            console.error("Failed to enroll in course:", err);
            alert("강의 신청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    /**
     * 강의 시청 페이지로 이동
     */
    const handleWatchCourse = () => {
        setIsOpenSuccessModal(false);
        router.push(`/course/player/${courseId}?lesson=1`);
    };

    return (
        <aside className="p-5 bg-[#1A1A20] rounded-xl border border-[#2A2A35] w-full lg:w-85 h-fit lg:sticky lg:top-5">
            <div className="text-base font-normal leading-6 text-secondary line-through mb-1">
                {originalPrice.toLocaleString()}원
            </div>
            <div className="text-[26px] font-bold leading-8 text-primary mb-5 flex gap-2.5 items-end">
                {currentPrice.toLocaleString()}원
                <div className="text-white bg-[#fb2c36] text-[10.5px] leading-3.5 font-medium rounded-md px-2 py-1">
                    {discountRate}% 할인
                </div>
            </div>
            <button
                className="w-full h-10.5 bg-primary text-black text-base font-medium rounded-md cursor-pointer transition-colors hover:bg-primary/90"
                onClick={isEnrolled ? handleWatchCourse : handleEnrollCourse}
                disabled={isLoading}
            >
                {isLoading
                    ? "수강 여부 확인 중..."
                    : isEnrolled
                      ? "강의 보기"
                      : "강의 신청하기"}
            </button>

            <div className="w-full h-px bg-[#2a2a35] my-5"></div>

            <div className="flex flex-col gap-[10.5px]">
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">강의 시간</div>
                    <div className="text-white">{duration}시간</div>
                </div>
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">수강 기한</div>
                    <div className="text-white">{accessPeriod}</div>
                </div>
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">강의 수</div>
                    <div className="text-white">{lectureCount}개</div>
                </div>
            </div>

            {isOpenSuccessModal && (
                <PurchaseSuccessModal
                    onCloseModal={() => setIsOpenSuccessModal(false)}
                    onWatchCourse={handleWatchCourse}
                />
            )}
        </aside>
    );
}
