import "server-only";
import { getInternalApiUrl } from "@/shared/api/internal/getInternalApiUrl";
import { Lesson } from "@/shared/types";
import { CourseProgress } from "../model/types";
import { MyEnrollmentItem } from "./courseApi";

const fetchCourseApiFromServer = async <T>({
    path,
    accessToken,
}: {
    path: string;
    accessToken?: string;
}) => {
    const response = await fetch(await getInternalApiUrl(path), {
        method: "GET",
        headers: accessToken
            ? {
                  Authorization: `Bearer ${accessToken}`,
              }
            : undefined,
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
};

export const getLessonServer = async ({
    lessonId,
    accessToken,
}: {
    lessonId: string;
    accessToken?: string;
}) => {
    if (!accessToken) {
        throw new Error(
            "Access token is required for fetching lesson details.",
        );
    }

    try {
        return await fetchCourseApiFromServer<Lesson>({
            path: `/api/lessons/${lessonId}`,
            accessToken,
        });
    } catch (err) {
        console.error("Failed to fetch lesson:", err);
        throw err;
    }
};

export const getCourseProgressServer = async (
    courseId: string,
    accessToken?: string,
) => {
    if (!accessToken) {
        throw new Error(
            "Access token is required for checking course progress.",
        );
    }

    try {
        return await fetchCourseApiFromServer<CourseProgress>({
            path: `/api/enrollments/${courseId}/progress`,
            accessToken,
        });
    } catch (err) {
        console.error("Failed to fetch course progress:", err);
        throw err;
    }
};

export const getMyEnrollmentsServer = async (
    accessToken?: string,
): Promise<MyEnrollmentItem[]> => {
    if (!accessToken) {
        return [];
    }

    try {
        return await fetchCourseApiFromServer<MyEnrollmentItem[]>({
            path: "/api/enrollments",
            accessToken,
        });
    } catch (err) {
        console.error("Failed to fetch my enrollments:", err);
        throw err;
    }
};
