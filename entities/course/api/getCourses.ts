import { BaseResponse, CourseWithRelations } from "@/shared/types";

export const getCourses = async () => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/courses",
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
