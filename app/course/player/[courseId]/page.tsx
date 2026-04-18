import { getCurriculumns } from "@/entities/course";
import {
    getCourseProgressServer,
    getLessonServer,
} from "@/entities/course/api/courseApiServer";
import CoursePlayerPage from "@/page/course-player";
import { cookies } from "next/headers";

export default async function CoursePlayer({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    const curriculumns = await getCurriculumns({ courseId });

    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;
    const progress = await getCourseProgressServer(courseId, accessToken);

    const lesson = await getLessonServer({
        lessonId: curriculumns[0].lessons[0]!.id,
        accessToken,
    });

    return (
        <CoursePlayerPage
            courseId={courseId}
            curriculumns={curriculumns}
            progress={progress}
            lesson={lesson}
        />
    );
}
