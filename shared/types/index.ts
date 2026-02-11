// Base response type
export interface BaseResponse<T> {
    data: T;
    message: string;
    status: string;
}

// Entity types
export * from "./user";
export * from "./course";
export * from "./enrollment";
export * from "./review";
export * from "./banner";
export * from "./promotion";
export * from "./recent-course";
