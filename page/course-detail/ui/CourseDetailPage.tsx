import {
    CourseWithRelations,
    CurriculumSectionWithRelations,
} from "@/shared/types";
import CourseInfo from "./CourseInfo";
import CoursePurchaseCard from "./CoursePurchaseCard";

export default function CourseDetailPage({
    course,
    curriculumns,
}: {
    course: CourseWithRelations;
    curriculumns: CurriculumSectionWithRelations[];
}) {
    return (
        <div className="max-w-269.5 mx-auto text-white py-4 sm:py-5 px-4 sm:px-5">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-7">
                <CourseInfo course={course} curriculumns={curriculumns} />

                <CoursePurchaseCard
                    courseId={course.id}
                    originalPrice={course.originalPrice}
                    currentPrice={course.price}
                    discountRate={Math.round(
                        ((course.originalPrice - course.price) /
                            course.originalPrice) *
                            100,
                    )}
                    duration={course.durationHours}
                    accessPeriod="무제한"
                    lectureCount={curriculumns.reduce(
                        (sum, section) => sum + section.lessons.length,
                        0,
                    )}
                />
            </div>
        </div>
    );
}
