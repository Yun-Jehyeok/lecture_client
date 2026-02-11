import { getCourses } from "@/entities/course";
import CourseListPage from "@/page/course-list";

export default async function Home() {
    const courses = await getCourses();

    if (!courses) {
        return <div>Failed to load courses.</div>;
    }
    return <CourseListPage courses={courses.data} />;
}
