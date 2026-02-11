import { CourseWithRelations } from "@/shared/types";

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
