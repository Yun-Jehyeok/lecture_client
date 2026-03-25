export type Category = {
    id: string;
    name: string;
    slug: string;
    icon?:
        | string
        | ForwardRefExoticComponent<
              Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
          >;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CategoryWithRelations = Category & {
    courses: Course[];
};

export type Course = {
    id: string;
    title: string;
    instructorName: string;
    categoryId: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
    durationHours: number;
    rating: number;
    totalStudents: number;
    isBestseller: boolean;
    isPopular: boolean;
    isNew: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type CourseWithRelations = Course & {
    category: Category;
    sections: CurriculumSection[];
    enrollments: Enrollment[];
    reviews: Review[];
    learningPoints: LearningPoint[];
    recentCourses: RecentCourse[];
};

export type CurriculumSection = {
    id: string;
    title: string;
    displayOrder: number;
};

export type CurriculumSectionWithRelations = CurriculumSection & {
    lessons: Lesson[];
};

export type Lesson = {
    id: string;
    sectionId: string;
    title: string;
    videoUrl: string;
    durationMinutes: number;
    watchTimeSeconds: number;
    description?: string;
    materialsUrl?: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
};

export type LessonWithRelations = Lesson & {
    section: CurriculumSection;
    userProgress: UserLessonProgress[];
    notes: Note[];
};

export type LearningPoint = {
    id: string;
    courseId: string;
    description: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
};

export type LearningPointWithRelations = LearningPoint & {
    course: Course;
};

import type { Enrollment } from "./enrollment";
import type { Review } from "./review";
import type { RecentCourse } from "./recent-course";
import type { UserLessonProgress, Note } from "./enrollment";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";
