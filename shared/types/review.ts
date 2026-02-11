export type Review = {
    id: string;
    userId: string;
    courseId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ReviewWithRelations = Review & {
    user: User;
    course: Course;
};

import type { User } from "./user";
import type { Course } from "./course";
