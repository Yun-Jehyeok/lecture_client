"use client";

import LoginModal from "@/features/auth/ui/LoginModal";
import {
    Home,
    Code,
    Server,
    Smartphone,
    Database,
    Palette,
    Cloud,
    BookOpen,
    User,
    LogOut,
    LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LNB() {
    const pathname = usePathname();

    const activeMenu = "all";

    const menuItems = [
        { icon: Home, label: "전체", value: "all" },
        { icon: Code, label: "프론트엔드", value: "frontend" },
        // { icon: Server, label: "백엔드", value: "backend" },
        // { icon: Smartphone, label: "모바일", value: "mobile" },
        // { icon: Database, label: "데이터베이스", value: "database" },
        // { icon: Palette, label: "UI/UX 디자인", value: "design" },
        // { icon: BookOpen, label: "기타", value: "other" },
    ];

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <nav
            className={`w-56 bg-[#1A1A20] h-screen flex flex-col justify-between border-r border-[#2A2A35] sticky left-0 top-0 ${pathname.includes("/course/player") ? "hidden" : ""}`}
        >
            <div>
                {/* Logo Section */}
                <h1 className="p-5 border-b border-[#2A2A35]">
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
                <div className="p-4 flex flex-col gap-2">
                    {menuItems.map((item) => {
                        const isActive = item.value === activeMenu;

                        return (
                            <button
                                key={item.value}
                                className={`w-full h-10 flex items-center gap-2.5 px-2.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${isActive ? "bg-primary hover:bg-primary/90" : "bg-transparent text-secondary hover:bg-[#2a2a35]"}`}
                            >
                                <item.icon size={14} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* User Profile */}
            <div className="border-t border-[#2a2a35] p-3.5">
                <button
                    className="bg-primary w-full flex items-center justify-center h-9 text-xs font-medium gap-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => {
                        setIsLoginModalOpen(true);
                    }}
                >
                    <LogIn size={14} />
                    로그인
                </button>
            </div>

            {isLoginModalOpen && (
                <LoginModal onCloseModal={() => setIsLoginModalOpen(false)} />
            )}
        </nav>
    );
}
