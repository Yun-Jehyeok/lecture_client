import { CourseCard } from "@/entities/course";
import { CourseWithRelations } from "@/shared/types";

export default function CourseListPage({
    courses,
}: {
    courses: CourseWithRelations[];
}) {
    return (
        <div className="text-white p-5 h-full">
            <h2 className="text-2xl leading-7 font-bold mb-2">전체 강의</h2>
            <div className="text-secondary text-sm font-normal leading-5">
                총 {courses.length}개의 강의
            </div>

            {courses.length > 1 ? (
                <div className="mt-6 grid grid-cols-4 gap-5">
                    {courses.map((course) => (
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
