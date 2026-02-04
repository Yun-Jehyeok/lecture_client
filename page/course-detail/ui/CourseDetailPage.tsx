import { CourseInfo, CoursePurchaseCard } from "@/widget/course-detail";

const learningPoints = [
    "React의 핵심 개념과 동작 원리 이해",
    "Hooks를 활용한 모던 React 개발",
    "상태 관리 라이브러리(Redux, Context API) 사용법",
    "실전 프로젝트 3개 완성",
    "Next.js를 활용한 서버 사이드 렌더링",
    "성능 최적화 기법 습득",
];

const curriculum = [
    {
        sectionTitle: "React 기초 다지기",
        lectures: [
            { title: "React 소개 및 개발 환경 설정", duration: "1시간" },
            { title: "JSX와 컴포넌트 기초", duration: "2시간" },
            { title: "Props와 State 이해하기", duration: "1.5시간" },
        ],
    },
    {
        sectionTitle: "고급 React 기능",
        lectures: [
            { title: "Hooks 완전 정복", duration: "3시간" },
            { title: "Context API로 전역 상태 관리", duration: "2시간" },
            { title: "Redux 기초 및 활용", duration: "2.5시간" },
        ],
    },
    {
        sectionTitle: "실전 프로젝트",
        lectures: [
            { title: "프로젝트 1: Todo 앱 만들기", duration: "3시간" },
            { title: "프로젝트 2: 블로그 플랫폼 개발", duration: "4시간" },
            { title: "프로젝트 3: E-commerce 사이트 구축", duration: "5시간" },
        ],
    },
];

export default function CourseDetailPage() {
    return (
        <div className="max-w-269.5 mx-auto text-white py-5">
            <div className="flex gap-7">
                <CourseInfo
                    category="프론트엔드"
                    isBestSeller={true}
                    title="React 완벽 마스터: 기초부터 실전 프로젝트까지"
                    description="React의 기초부터 고급 기능까지 체계적으로 학습하고, 실전 프로젝트를 통해 실무 능력을 키우는 완벽한 React 강의입니다. Hooks, Context API, Redux, Next.js까지 모두 다룹니다."
                    rating={4.8}
                    ratingCount={2341}
                    studentCount={2341}
                    duration="24시간"
                    instructor="코딩하는 대머리"
                    thumbnailUrl="https://picsum.photos/300/140"
                    learningPoints={learningPoints}
                    curriculum={curriculum}
                />

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
