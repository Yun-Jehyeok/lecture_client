"use client";

import { MyEnrollmentItem } from "@/entities/course";
import { useUser } from "@/shared/hooks";
import { ArrowRight, BookOpen, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/entities/user/userApi";
import { AUTH_CHANGED_EVENT } from "@/shared/hooks/useUser";
import { User } from "@/shared/types";

export default function MyPage({
    enrollments,
    user,
}: {
    enrollments: MyEnrollmentItem[];
    user: User;
}) {
    const router = useRouter();
    const { setUser } = useUser();

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onLogout = async () => {
        try {
            setIsLoggingOut(true);
            const logoutResponse = await logout();

            if (!logoutResponse) {
                alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
                return;
            }

            alert("로그아웃되었습니다.");
            setUser(null);

            // auth-changed 이벤트 발생 > 유저 정보 업데이트용
            window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="text-white p-4 sm:p-5 h-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                    <h2 className="text-xl sm:text-2xl leading-7 font-bold mb-1">
                        마이페이지
                    </h2>
                    <div className="text-secondary text-sm leading-5">
                        {user
                            ? `${user.username}님 환영합니다.`
                            : "내 수강 강의를 확인하세요"}
                    </div>
                </div>

                <button
                    className="bg-primary text-black w-full sm:w-auto px-4 h-10 flex items-center justify-center gap-2 text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-70"
                    onClick={onLogout}
                    disabled={isLoggingOut}
                >
                    <LogOut size={14} />
                    {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                </button>
            </div>

            <section className="bg-[#1A1A20] border border-[#2A2A35] rounded-xl overflow-hidden">
                <div className="px-4 sm:px-5 py-4 border-b border-[#2A2A35] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="text-base font-semibold">
                        내 수강 강의 목록
                    </h3>
                </div>

                {enrollments ? (
                    enrollments.length === 0 ? (
                        <div className="px-4 sm:px-5 py-10 text-sm text-secondary">
                            수강 중인 강의가 없습니다.
                        </div>
                    ) : (
                        <div className="divide-y divide-[#2A2A35]">
                            {enrollments.map((enrollment) => (
                                <button
                                    key={enrollment.id}
                                    onClick={() => {
                                        router.push(
                                            `/course/player/${enrollment.courseId}`,
                                        );
                                    }}
                                    className="w-full text-left px-4 sm:px-5 py-4 cursor-pointer hover:bg-[#2a2a35] transition-colors flex items-start justify-between gap-3"
                                >
                                    <div className="min-w-0">
                                        <div className="text-sm text-secondary mb-1">
                                            {enrollment.course.category.name}
                                        </div>
                                        <div className="text-base font-medium wrap-break-word mb-2">
                                            {enrollment.course.title}
                                        </div>
                                        <div className="text-xs text-secondary">
                                            진행률{" "}
                                            {enrollment.progressPercentage}%
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 mt-1 text-secondary shrink-0" />
                                </button>
                            ))}
                        </div>
                    )
                ) : (
                    ""
                )}
            </section>
        </div>
    );
}
