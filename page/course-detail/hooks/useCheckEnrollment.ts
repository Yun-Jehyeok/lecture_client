import { useEffect, useState } from "react";
import { User } from "@/shared/types";
import { checkEnrollmentApi } from "@/entities/course";

export const useCheckEnrollment = (user: User | null, courseId: string) => {
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const checkEnrollment = async () => {
            try {
                if (!user) {
                    setIsEnrolled(false);
                    return;
                }
                const result = await checkEnrollmentApi(courseId);
                setIsEnrolled(result);
            } catch (err) {
                console.error("Failed to check enrollment:", err);
                setIsEnrolled(false);
                return;
            }
        };

        checkEnrollment();
    }, [user, courseId]);

    return isEnrolled;
};
