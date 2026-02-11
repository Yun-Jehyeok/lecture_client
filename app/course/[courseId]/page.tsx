import { getCourse } from "@/entities/course";
import CourseDetailPage from "@/page/course-detail";

export default async function CourseDetail({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const courseId = (await params).courseId;
    const course = await getCourse({ courseId });

    if (!course) {
        return <div>Failed to load course.</div>;
    }
    return <CourseDetailPage course={course} />;
}
