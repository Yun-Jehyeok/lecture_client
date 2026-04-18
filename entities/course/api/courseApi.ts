import {
    BaseResponse,
    Category,
    CourseWithRelations,
    Lesson,
} from "@/shared/types";
import { CurriculumSectionWithRelations } from "@/shared/types";
import { CourseProgress } from "../model/types";

/**
 * 주어진 courseId에 해당하는 코스의 상세 정보를 가져옵니다.
 *
 * @param courseId: string - 가져올 코스의 ID
 * @returns CourseWithRelations - 코스와 관련된 모든 정보를 포함하는 객체
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 주어진 courseId에 해당하는 코스의 상세 정보를 API로부터 가져옵니다.
 * API 요청이 성공하면 CourseWithRelations 타입의 객체를 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const getCourse = async ({ courseId }: { courseId: string }) => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + `/courses/${courseId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: CourseWithRelations = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch course:", err);
        throw err;
    }
};

/**
 * 모든 코스의 목록을 가져옵니다.
 * @returns BaseResponse<CourseWithRelations[]> - 코스 목록과 관련된 정보를 포함하는 객체
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 모든 코스의 목록을 API로부터 가져옵니다.
 * API 요청이 성공하면 BaseResponse<CourseWithRelations[]> 타입의 객체를 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const getCourses = async (params?: {
    category_id?: string;
    search?: string;
    sort?: "latest" | "rating" | "students" | "price";
    page?: number;
    limit?: number;
}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.category_id)
            queryParams.append("category_id", params.category_id);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.page) queryParams.append("page", params.page.toString());
        if (params?.limit) queryParams.append("limit", params.limit.toString());

        const queryString = queryParams.toString();
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL +
                "/courses" +
                (queryString ? `?${queryString}` : ""),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: BaseResponse<CourseWithRelations[]> =
            await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch courses:", err);
        throw err;
    }
};

export const getLesson = async ({
    lessonId,
    accessToken,
}: {
    lessonId: string;
    accessToken?: string;
}) => {
    try {
        if (!accessToken && typeof window === "undefined") {
            throw new Error(
                "Use getLessonServer when fetching lesson details on the server.",
            );
        }

        const response = await fetch(`/api/lessons/${lessonId}`, {
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

        const result: Lesson = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch lesson:", err);
        throw err;
    }
};

/**
 * 주어진 courseId에 해당하는 코스의 커리큘럼 정보를 가져옵니다.
 *
 * @param courseId: string - 가져올 코스의 ID
 * @return CurriculumSectionWithRelations[] - 코스의 커리큘럼 섹션과 관련된 정보를 포함하는 배열
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 주어진 courseId에 해당하는 코스의 커리큘럼 정보를 API로부터 가져옵니다.
 * API 요청이 성공하면 CurriculumSectionWithRelations[] 타입의 배열을 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const getCurriculumns = async ({ courseId }: { courseId: string }) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/curriculum`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: CurriculumSectionWithRelations[] = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch courses:", err);
        throw err;
    }
};

/**
 * 전체 카테고리 목록을 가져옵니다.
 * @returns Category[] - 카테고리 목록을 포함하는 배열
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 전체 카테고리 목록을 API로부터 가져옵니다.
 * API 요청이 성공하면 Category[] 타입의 배열을 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const getCategories = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: Category[] = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch categories:", err);
        throw err;
    }
};

/**
 * 주어진 courseId에 해당하는 강의에 사용자를 등록합니다.
 * @param courseId - 등록할 강의 ID
 * @returns 등록 결과를 포함하는 객체
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 주어진 courseId에 해당하는 강의에 사용자를 등록합니다.
 * API 요청이 성공하면 등록 결과를 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const enrollCourse = async (courseId: string) => {
    try {
        const response = await fetch(`/api/enrollments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to enroll course:", err);
        throw err;
    }
};

/**
 * 주어진 courseId에 해당하는 강의에 사용자가 등록되어 있는지 확인합니다.
 * @param courseId - 확인할 강의 ID
 * @returns 등록 여부를 나타내는 boolean 값
 * @throws Error - HTTP 요청이 실패할 경우 에러를 던짐
 *
 * 이 함수는 주어진 courseId에 해당하는 강의에 사용자가 등록되어 있는지 확인합니다.
 * API 요청이 성공하면 등록 여부를 나타내는 boolean 값을 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 */
export const checkEnrollmentApi = async (courseId: string) => {
    try {
        const response = await fetch(`/api/enrollments/${courseId}`, {
            method: "GET",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.courseId) return true;
        else return false;
    } catch (err) {
        console.error("Failed to check enrollment status:", err);
        throw err;
    }
};

/**
 * 주어진 courseId에 해당하는 강의에 대한 사용자의 학습 진행 상황을 가져옵니다.
 * @param courseId
 * @param accessToken
 * @returns
 *
 * 이 함수는 주어진 courseId에 해당하는 강의에 대한 사용자의 학습 진행 상황을 API로부터 가져옵니다.
 * API 요청이 성공하면 학습 진행 상황을 반환하며, 실패할 경우 에러를 콘솔에 출력하고 다시 던집니다.
 * accessToken이 제공되지 않은 경우 에러를 던집니다.
 */
export const getCourseProgress = async (
    courseId: string,
    accessToken?: string,
) => {
    try {
        if (!accessToken && typeof window === "undefined") {
            throw new Error(
                "Use getCourseProgressServer when fetching course progress on the server.",
            );
        }

        const response = await fetch(`/api/enrollments/${courseId}/progress`, {
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

        const result: CourseProgress = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch course progress:", err);
        throw err;
    }
};

export type MyEnrollmentItem = {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: string;
    completedAt: string | null;
    progressPercentage: number;
    course: {
        id: string;
        title: string;
        category: {
            id: string;
            name: string;
        };
    };
};

export const getMyEnrollments = async (
    accessToken?: string,
): Promise<MyEnrollmentItem[]> => {
    try {
        if (!accessToken && typeof window === "undefined") {
            return [];
        }

        const response = await fetch(`/api/enrollments`, {
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

        const result: MyEnrollmentItem[] = await response.json();

        return result;
    } catch (err) {
        console.error("Failed to fetch my enrollments:", err);
        throw err;
    }
};
