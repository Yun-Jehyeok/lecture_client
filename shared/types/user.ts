export type User = {
    id: string;
    email: string;
    username: string;
    passwordHash?: string;
    profileImageUrl?: string;
    provider?: string; // google, kakao, naver, local
    providerId?: string;
    createdAt: Date;
    updatedAt: Date;
};

export type UserWithRelations = User & {
    enrollments: Enrollment[];
    reviews: Review[];
    lessonProgress: UserLessonProgress[];
    notes: Note[];
    recentCourses: RecentCourse[];
};

import type { Enrollment, UserLessonProgress, Note } from "./enrollment";
import type { Review } from "./review";
import type { RecentCourse } from "./recent-course";
