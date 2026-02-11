export type Enrollment = {
    id: string;
    userId: string;
    courseId: string;
    enrolledAt: Date;
    completedAt?: Date;
    progressPercentage: number;
    createdAt: Date;
    updatedAt: Date;
};

export type EnrollmentWithRelations = Enrollment & {
    user: User;
    course: Course;
    lessonProgress: UserLessonProgress[];
    notes: Note[];
};

export type UserLessonProgress = {
    id: string;
    userId: string;
    lessonId: string;
    enrollmentId: string;
    isCompleted: boolean;
    lastWatchedAt?: Date;
    watchTimeSeconds: number;
    completedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type UserLessonProgressWithRelations = UserLessonProgress & {
    user: User;
    lesson: Lesson;
    enrollment: Enrollment;
};

export type Note = {
    id: string;
    userId: string;
    lessonId: string;
    enrollmentId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export type NoteWithRelations = Note & {
    user: User;
    lesson: Lesson;
    enrollment: Enrollment;
};

import type { User } from "./user";
import type { Course, Lesson } from "./course";
