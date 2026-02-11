"use client";

import { CourseWithRelations } from "@/shared/types";
import { Play } from "lucide-react";
import Link from "next/link";

export default function CourseCard({
    course,
}: {
    course: CourseWithRelations;
}) {
    return (
        <Link
            href={`/course/${course.id}`}
            className="bg-[#1A1A20]/50 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
        >
            <div className="h-35">
                <img
                    src="https://picsum.photos/300/140"
                    className="rounded-t-xl w-full object-fit h-35"
                />

                <div className="absolute top-0 left-0 hidden group-hover:flex rounded-t-xl w-full h-35 bg-black/40 justify-center items-center">
                    <button className="bg-primary text-black flex items-center justify-center gap-2 px-3 py-2 rounded-md cursor-pointer text-sm">
                        <Play className="w-4 h-4" />
                        수강하기
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="text-sm leading-5 font-semibold mb-6">
                    {course.title}
                </div>
                <div className="flex flex-col gap-2.5 text-xs leading-4 font-normal text-secondary">
                    <div>{course.instructorName}</div>
                    <div className="flex items-center">
                        <span className="text-sm text-white leading-5 flex items-center gap-1">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.72283 1.33874C6.74839 1.28709 6.78788 1.24362 6.83684 1.21322C6.8858 1.18282 6.94228 1.16672 6.99991 1.16672C7.05754 1.16672 7.11402 1.18282 7.16298 1.21322C7.21194 1.24362 7.25143 1.28709 7.27699 1.33874L8.62449 4.06816C8.71326 4.2478 8.8443 4.40323 9.00636 4.52109C9.16842 4.63895 9.35665 4.71572 9.55491 4.74482L12.5684 5.18582C12.6255 5.1941 12.6792 5.21818 12.7233 5.25535C12.7674 5.29253 12.8002 5.34131 12.8181 5.39618C12.8359 5.45104 12.8381 5.50981 12.8243 5.56583C12.8104 5.62184 12.7812 5.67288 12.7399 5.71316L10.5606 7.83532C10.4169 7.97538 10.3093 8.14827 10.2472 8.33911C10.1851 8.52994 10.1704 8.73301 10.2042 8.93082L10.7187 11.9292C10.7287 11.9862 10.7226 12.045 10.7009 12.0987C10.6792 12.1525 10.6428 12.199 10.5959 12.2331C10.549 12.2671 10.4935 12.2873 10.4357 12.2913C10.3778 12.2954 10.3201 12.2831 10.2689 12.2558L7.57508 10.8395C7.39758 10.7463 7.2001 10.6976 6.99962 10.6976C6.79914 10.6976 6.60166 10.7463 6.42416 10.8395L3.73091 12.2558C3.67977 12.2829 3.62206 12.2951 3.56434 12.291C3.50662 12.2869 3.45121 12.2667 3.40442 12.2326C3.35762 12.1986 3.32131 12.1521 3.29963 12.0985C3.27794 12.0448 3.27174 11.9861 3.28174 11.9292L3.79566 8.93141C3.82961 8.7335 3.8149 8.5303 3.75281 8.33935C3.69071 8.14839 3.5831 7.97541 3.43924 7.83532L1.25991 5.71374C1.21826 5.67351 1.18874 5.62239 1.17472 5.5662C1.1607 5.51001 1.16275 5.45102 1.18062 5.39593C1.1985 5.34085 1.23148 5.2919 1.27582 5.25465C1.32016 5.21739 1.37407 5.19335 1.43141 5.18524L4.44433 4.74482C4.64281 4.71595 4.8313 4.63927 4.99358 4.5214C5.15586 4.40352 5.28707 4.24798 5.37591 4.06816L6.72283 1.33874Z"
                                    fill="#FE9A00"
                                    stroke="#FE9A00"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {course.rating}
                        </span>
                        &nbsp; ({course.totalStudents}명)
                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1_1184)">
                                <path
                                    d="M5.25 2.625V5.25L7 6.125"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5.25 9.625C7.66625 9.625 9.625 7.66625 9.625 5.25C9.625 2.83375 7.66625 0.875 5.25 0.875C2.83375 0.875 0.875 2.83375 0.875 5.25C0.875 7.66625 2.83375 9.625 5.25 9.625Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_1184">
                                    <rect
                                        width="10.5"
                                        height="10.5"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        {course.durationHours} 시간
                        <svg
                            width="5"
                            height="18"
                            viewBox="0 0 5 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-1"
                        >
                            <path
                                d="M2.38875 9.305C2.09475 9.305 1.83342 9.23967 1.60475 9.109C1.38425 8.97833 1.20867 8.80275 1.078 8.58225C0.947333 8.35358 0.882 8.09225 0.882 7.79825C0.882 7.50425 0.947333 7.24292 1.078 7.01425C1.20867 6.78558 1.38425 6.60592 1.60475 6.47525C1.83342 6.34458 2.09475 6.27925 2.38875 6.27925C2.68275 6.27925 2.94408 6.34458 3.17275 6.47525C3.40142 6.60592 3.58108 6.78558 3.71175 7.01425C3.84242 7.24292 3.90775 7.50425 3.90775 7.79825C3.90775 8.09225 3.84242 8.35358 3.71175 8.58225C3.58108 8.80275 3.40142 8.97833 3.17275 9.109C2.94408 9.23967 2.68275 9.305 2.38875 9.305Z"
                                fill="#9CA3AF"
                            />
                        </svg>
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1_1191)">
                                <path
                                    d="M7 9.1875V8.3125C7 7.84837 6.81563 7.40325 6.48744 7.07506C6.15925 6.74687 5.71413 6.5625 5.25 6.5625H2.625C2.16087 6.5625 1.71575 6.74687 1.38756 7.07506C1.05937 7.40325 0.875 7.84837 0.875 8.3125V9.1875"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 1.3685C7.37527 1.46579 7.70761 1.68493 7.94486 1.99153C8.18211 2.29813 8.31084 2.67483 8.31084 3.0625C8.31084 3.45017 8.18211 3.82687 7.94486 4.13347C7.70761 4.44007 7.37527 4.65921 7 4.7565"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.625 9.18751V8.31251C9.62471 7.92477 9.49566 7.5481 9.2581 7.24165C9.02054 6.9352 8.68793 6.71632 8.3125 6.61938"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3.9375 4.8125C4.904 4.8125 5.6875 4.029 5.6875 3.0625C5.6875 2.096 4.904 1.3125 3.9375 1.3125C2.971 1.3125 2.1875 2.096 2.1875 3.0625C2.1875 4.029 2.971 4.8125 3.9375 4.8125Z"
                                    stroke="#9CA3AF"
                                    strokeWidth="0.875"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_1191">
                                    <rect
                                        width="10.5"
                                        height="10.5"
                                        fill="white"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        {course.totalStudents}명
                    </div>

                    <div className="text-primary font-bold text-base leading-6">
                        {course.price}원
                    </div>
                </div>
            </div>
        </Link>
    );
}
