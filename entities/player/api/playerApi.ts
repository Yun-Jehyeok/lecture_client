export const updateWatchTime = async (lessonId: string, watchTime: number) => {
    fetch(`/api/lessons/${lessonId}/watch-time`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            watch_time_seconds: watchTime,
        }),
    });
};

export const completeLesson = async (lessonId: string) => {
    fetch(`/api/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
