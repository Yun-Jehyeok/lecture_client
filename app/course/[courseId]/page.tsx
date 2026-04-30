import { getCourse, getCurriculumns } from "@/entities/course";
import CourseDetailPage from "@/page/course-detail";

const AVAILABLE_COURSE_IDS = ["1", "2", "3"] as const;
type AvailableCourseId = (typeof AVAILABLE_COURSE_IDS)[number];
export default async function CourseDetail({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const courseId = (await params).courseId;

    if (!AVAILABLE_COURSE_IDS.includes(courseId as AvailableCourseId)) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                추후 업데이트 예정입니다
            </div>
        );
    }

    const [course, curriculumns] = await Promise.all([
        getCourse({ courseId }),
        getCurriculumns({ courseId }),
    ]);

    if (!course) {
        return <div>Failed to load course.</div>;
    }
    return <CourseDetailPage course={course} curriculumns={curriculumns} />;
}
