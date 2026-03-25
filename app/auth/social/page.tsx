"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SocialAuthPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">로그인 중</h1>
        </div>
    );
}
