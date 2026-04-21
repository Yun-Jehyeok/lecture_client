import { useEffect, useState } from "react";
import { User } from "@/shared/types";
import { checkEnrollmentApi } from "@/entities/course";

type UseCheckEnrollmentResult = {
    isEnrolled: boolean;
    isLoading: boolean;
    durationMs: number | null;
};

export const useCheckEnrollment = (user: User | null, courseId: string) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [durationMs, setDurationMs] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;

        const checkEnrollment = async () => {
            const startTime = performance.now();

            try {
                if (!user) {
                    if (!isMounted) {
                        return;
                    }

                    setIsEnrolled(false);
                    setDurationMs(performance.now() - startTime);
                    setIsLoading(false);
                    return;
                }

                setIsLoading(true);
                setDurationMs(null);

                const result = await checkEnrollmentApi(courseId);

                if (!isMounted) {
                    return;
                }

                setIsEnrolled(result);
                setDurationMs(performance.now() - startTime);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to check enrollment:", err);

                if (!isMounted) {
                    return;
                }

                setIsEnrolled(false);
                setDurationMs(performance.now() - startTime);
                setIsLoading(false);
                return;
            }
        };

        checkEnrollment();

        return () => {
            isMounted = false;
        };
    }, [user, courseId]);

    return {
        isEnrolled,
        isLoading,
        durationMs,
    } satisfies UseCheckEnrollmentResult;
};
