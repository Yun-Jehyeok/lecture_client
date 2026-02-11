export type RecentCourse = {
    id: string;
    userId: string;
    courseId: string;
    viewedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type RecentCourseWithRelations = RecentCourse & {
    user: User;
    course: Course;
};

import type { User } from "./user";
import type { Course } from "./course";
