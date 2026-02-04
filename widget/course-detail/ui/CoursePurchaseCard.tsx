"use client";

import { useState } from "react";
import PurchaseSuccessModal from "./PurchaseSuccessModal";

interface CoursePurchaseCardProps {
    originalPrice: number;
    currentPrice: number;
    discountRate: number;
    duration: string;
    accessPeriod: string;
    hasCertificate: boolean;
    lectureCount: number;
}

export default function CoursePurchaseCard({
    originalPrice,
    currentPrice,
    discountRate,
    duration,
    accessPeriod,
    hasCertificate,
    lectureCount,
}: CoursePurchaseCardProps) {
    const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

    return (
        <aside className="p-5 bg-[#1A1A20] rounded-xl border border-[#2A2A35] w-85 h-fit sticky top-5">
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
                onClick={() => setIsOpenSuccessModal(true)}
            >
                강의 신청하기
            </button>

            <div className="w-full h-px bg-[#2a2a35] my-5"></div>

            <div className="flex flex-col gap-[10.5px]">
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">강의 시간</div>
                    <div className="text-white">{duration}</div>
                </div>
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">수강 기한</div>
                    <div className="text-white">{accessPeriod}</div>
                </div>
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">수료증</div>
                    <div className="text-white">
                        {hasCertificate ? "제공" : "미제공"}
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs leading-4">
                    <div className="text-secondary">강의 수</div>
                    <div className="text-white">{lectureCount}개</div>
                </div>
            </div>

            {isOpenSuccessModal && (
                <PurchaseSuccessModal
                    onCloseModal={() => setIsOpenSuccessModal(false)}
                />
            )}
        </aside>
    );
}
