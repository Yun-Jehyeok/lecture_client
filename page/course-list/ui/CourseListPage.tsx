import { CourseCard } from "@/entities/course";
import { CourseWithRelations } from "@/shared/types";

export default function CourseListPage({
    courses,
}: {
    courses: CourseWithRelations[];
}) {
    return (
        <div className="text-white p-4 sm:p-5 h-full">
            <h2 className="text-xl sm:text-2xl leading-7 font-bold mb-2">
                전체 강의
            </h2>
            <div className="text-secondary text-sm font-normal leading-5">
                총 {courses.length}개의 강의
            </div>

            {courses.length ? (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                    {courses.sort((a, b) => Number(a.id) - Number(b.id)).map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <NoItems />
            )}
        </div>
    );
}

function NoItems() {
    return (
        <div className="text-gray-400 text-center h-120 flex items-center justify-center">
            강의가 없습니다.
        </div>
    );
}
