import { CourseWithRelations } from "@/shared/types";
import CourseInfo from "./CourseInfo";
import CoursePurchaseCard from "./CoursePurchaseCard";

export default function CourseDetailPage({
    course,
}: {
    course: CourseWithRelations;
}) {
    return (
        <div className="max-w-269.5 mx-auto text-white py-5">
            <div className="flex gap-7">
                <CourseInfo course={course} />

                <CoursePurchaseCard
                    originalPrice={38000}
                    currentPrice={0}
                    discountRate={100}
                    duration="24시간"
                    accessPeriod="무제한"
                    hasCertificate={true}
                    lectureCount={15}
                />
            </div>
        </div>
    );
}
