"use client";

import { completeLesson, updateWatchTime } from "@/entities/player";
import { getAccessToken } from "@/shared/api";
import { useEffect, useRef } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface Props {
    videoId: string; // 유튜브 영상 ID (전체 URL이 아닌 ID만)
    lessonId: string; // 현재 레슨 ID
    startTime: number; // 시작 시간 (초)
}

export default function YoutubePlayer({ videoId, lessonId, startTime }: Props) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadYoutubeAPI = () => {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        };

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(containerRef.current, {
                height: "100%",
                width: "100%",
                videoId,
                playerVars: {
                    playsinline: 1,
                    start: startTime,
                },
                events: {
                    onReady: onReady,
                    onStateChange: onStateChange,
                },
            });
        };

        if (!window.YT) {
            loadYoutubeAPI();
        } else {
            window.onYouTubeIframeAPIReady();
        }

        async function onReady() {
            console.log("Player ready");
            const accessToken = await getAccessToken();

            // 5초마다 현재 시간 가져오기
            setInterval(() => {
                if (!playerRef.current) return;

                const current = playerRef.current.getCurrentTime();
                // const duration = playerRef.current.getDuration();

                // 시청 시간 업데이트 API 호출
                let currentTime = Math.floor(current);
                console.log("현재 시청 시간 (초):", currentTime);
                updateWatchTime(lessonId, currentTime, accessToken);

                // if (duration) {
                //     const percent = (current / duration) * 100;
                //     console.log("시청률:", percent.toFixed(2) + "%");
                // }
            }, 5000);
        }

        async function onStateChange(event: any) {
            // 다 봤을 경우 시청 완료 API 호출
            if (event.data === 0) {
                // 시청 완료 API 호출
                completeLesson(lessonId);
            }
        }
    }, [videoId]);

    return <div ref={containerRef} />;
}
