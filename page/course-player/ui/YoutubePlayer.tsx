"use client";

import { completeLesson, updateWatchTime } from "@/entities/player";
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
    isPlaying: boolean;
}

export default function YoutubePlayer({
    videoId,
    lessonId,
    startTime,
    isPlaying,
}: Props) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const isReadyRef = useRef(false);
    const lessonIdRef = useRef(lessonId);

    lessonIdRef.current = lessonId;

    const syncPlayer = () => {
        if (!isReadyRef.current || !playerRef.current) {
            return;
        }

        const player = playerRef.current;
        const method = isPlaying ? "loadVideoById" : "cueVideoById";

        if (typeof player[method] === "function") {
            player[method]({
                videoId,
                startSeconds: startTime,
            });
        }
    };

    useEffect(() => {
        const loadYoutubeAPI = () => {
            if (
                document.querySelector(
                    'script[src="https://www.youtube.com/iframe_api"]',
                )
            ) {
                return;
            }

            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);
        };

        const createPlayer = () => {
            if (
                !containerRef.current ||
                playerRef.current ||
                !window.YT?.Player
            ) {
                return;
            }

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

        const previousOnReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            previousOnReady?.();
            createPlayer();
        };

        if (!window.YT?.Player) {
            loadYoutubeAPI();
        } else {
            createPlayer();
        }

        async function onReady() {
            isReadyRef.current = true;
            syncPlayer();

            // 5초마다 현재 시간 가져오기
            intervalRef.current = setInterval(() => {
                if (!playerRef.current) return;

                const current = playerRef.current.getCurrentTime();
                const currentTime = Math.floor(current);
                updateWatchTime(lessonIdRef.current, currentTime);
            }, 5000);
        }

        async function onStateChange(event: any) {
            // 다 봤을 경우 시청 완료 API 호출
            if (event.data === 0) {
                completeLesson(lessonIdRef.current);
            }
        }

        return () => {
            isReadyRef.current = false;
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (playerRef.current) {
                try {
                    playerRef.current.destroy();
                } catch {
                    // YouTube iframe cleanup can race with React unmount.
                }
                playerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        syncPlayer();
    }, [videoId, startTime, isPlaying]);

    return <div ref={containerRef} className="w-full h-full" />;
}
