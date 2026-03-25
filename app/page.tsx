import { getCourses, getLesson } from "@/entities/course";
import CourseListPage from "@/page/course-list";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const ct = (await searchParams).ct;
    const category = ct ?? "all";
    const courses = await getCourses();

    if (!courses) {
        return <div>Failed to load courses.</div>;
    }

    return <CourseListPage courses={courses.data} />;
}
