import { CourseCard } from "@/entities";

export default function CourseListPage() {
    return (
        <div className="text-white p-5">
            <h2 className="text-2xl leading-7 font-bold mb-2">전체 강의</h2>
            <div className="text-secondary text-sm font-normal leading-5">
                총 15개의 강의
            </div>

            <div className="mt-6 grid grid-cols-4 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (item) => (
                        <CourseCard key={item} />
                    ),
                )}
            </div>
        </div>
    );
}
