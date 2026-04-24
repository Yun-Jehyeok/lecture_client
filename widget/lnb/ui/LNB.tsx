"use client";

import LoginModal from "@/features/auth/ui/LoginModal";
import { useUser } from "@/shared/hooks";
import { Category, User } from "@/shared/types";
import { Home, Code, BookOpen, LogIn, User as UserIco } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LNB({
    initialCategories,
    prefetchedUser,
}: {
    initialCategories: Category[];
    prefetchedUser: User | null;
}) {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const { user } = useUser(prefetchedUser);

    const activeMenu = params.get("ct") || "all";

    const defaultCategory: Category = {
        id: "0",
        name: "전체",
        slug: "all",
        displayOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        icon: Home,
    };
    const [categories] = useState<Category[]>([
        defaultCategory,
        ...initialCategories,
    ]);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const isLNBHidden = pathname.includes("/course/player");

    return (
        <nav
            className={`bg-[#1A1A20] flex flex-col border-[#2A2A35] ${isLNBHidden ? "hidden" : ""} w-full md:w-56 md:h-screen md:sticky md:left-0 md:top-0 border-b md:border-b-0 md:border-r`}
        >
            <div>
                {/* Logo Section */}
                <h1 className="p-4 md:p-5 border-b border-[#2A2A35]">
                    <Link
                        href="/"
                        className="text-lg font-semibold leading-6 text-white flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-primary rounded-lg text-black flex items-center justify-center">
                            <BookOpen />
                        </div>
                        DevLearn
                    </Link>
                </h1>

                {/* Menu Items */}
                <div className="p-3 md:p-4 flex gap-2 md:flex-col overflow-x-auto md:overflow-visible">
                    {categories.map((item) => {
                        const isActive = item.slug === activeMenu;

                        return (
                            <button
                                key={item.slug}
                                className={`shrink-0 whitespace-nowrap md:w-full h-9 md:h-10 flex items-center gap-2.5 px-2.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${isActive ? "bg-primary hover:bg-primary/90" : "bg-transparent text-secondary hover:bg-[#2a2a35]"}`}
                                onClick={() => {
                                    if (item.slug !== 'all' && item.slug !== 'frontend') {
                                        alert("추후 업데이트 예정입니다");
                                        return;
                                    }

                                    router.push(
                                        item.slug === "all"
                                            ? "/"
                                            : `/?ct=${item.slug}`,
                                    );
                                }}
                            >
                                {item.slug === "all" && item.icon ? (
                                    <item.icon size={14} />
                                ) : (
                                    <Code size={14} />
                                )}
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* User Profile */}
            <div className="border-t border-[#2a2a35] p-3 md:p-3.5 md:mt-auto">
                {user ? (
                    <button
                        className="bg-primary w-full flex items-center justify-center h-9 text-xs font-medium gap-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                        onClick={() => {
                            router.push("/mypage");
                        }}
                    >
                        <UserIco size={14} />
                        마이페이지
                    </button>
                ) : (
                    <button
                        className="bg-primary w-full flex items-center justify-center h-9 text-xs font-medium gap-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                        onClick={() => {
                            setIsLoginModalOpen(true);
                        }}
                    >
                        <LogIn size={14} />
                        로그인
                    </button>
                )}
            </div>

            {isLoginModalOpen && (
                <LoginModal onCloseModal={() => setIsLoginModalOpen(false)} />
            )}
        </nav>
    );
}
