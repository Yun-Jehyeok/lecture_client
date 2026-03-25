import { getAccessToken } from "@/shared/api";

export const updateWatchTime = async (
    lessonId: string,
    watchTime: number,
    accessToken: string | null,
) => {
    if (!accessToken) return;

    fetch(process.env.NEXT_PUBLIC_API_URL + `/lessons/${lessonId}/watch-time`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            watch_time_seconds: watchTime,
        }),
    });
};

export const completeLesson = async (lessonId: string) => {
    const accessToken = await getAccessToken();
    if (!accessToken) return;

    fetch(process.env.NEXT_PUBLIC_API_URL + `/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
