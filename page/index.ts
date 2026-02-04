/**
 * 📄 PAGES (페이지)
 *
 * 애플리케이션의 페이지/라우트를 구성하는 레이어입니다.
 * widgets와 features를 조합하여 완전한 페이지를 만듭니다.
 *
 * 특징:
 * - 라우팅과 연결되는 페이지 컴포넌트
 * - widgets, features, entities를 조합
 * - 페이지 레벨의 데이터 로딩 및 상태 관리
 * - 다른 pages에 의존하지 않음
 *
 * 구조 예시:
 * pages/
 *   home/
 *     ui/
 *       HomePage.tsx        - 홈 페이지 컴포넌트
 *     model/
 *       useHomePage.ts      - 페이지 로직
 *     index.ts
 *
 *   lecture-detail/
 *     ui/
 *       LectureDetailPage.tsx  - 강의 상세 페이지
 *     model/
 *       useLectureDetail.ts
 *     index.ts
 *
 *   my-lectures/
 *     ui/
 *       MyLecturesPage.tsx     - 내 강의 페이지
 *     model/
 *       useMyLectures.ts
 *     index.ts
 *
 *   profile/
 *     ui/
 *       ProfilePage.tsx        - 프로필 페이지
 *     model/
 *       useProfile.ts
 *     index.ts
 *
 * Next.js app directory와 함께 사용 예시:
 * // app/lectures/[id]/page.tsx
 * import { LectureDetailPage } from '@/pages/lecture-detail'
 *
 * export default function Page({ params }: { params: { id: string } }) {
 *   return <LectureDetailPage lectureId={params.id} />
 * }
 */
