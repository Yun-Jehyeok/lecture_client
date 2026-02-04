/**
 * 🧩 WIDGETS (위젯)
 *
 * 독립적이고 완전한 기능을 가진 큰 UI 블록들을 담는 레이어입니다.
 * features와 entities를 조합하여 복잡한 UI 컴포넌트를 만듭니다.
 *
 * 특징:
 * - 페이지의 주요 구성 블록
 * - features와 entities를 조합
 * - 비즈니스적으로 의미있는 독립적인 UI 영역
 * - pages에서 사용 가능
 *
 * 구조 예시:
 * widget/
 *   header/
 *     ui/
 *       Header.tsx          - 헤더 컴포넌트
 *       UserMenu.tsx        - 사용자 메뉴
 *     model/
 *       useHeader.ts
 *     index.ts
 *
 *   sidebar/
 *     ui/
 *       Sidebar.tsx         - 사이드바
 *       Navigation.tsx      - 네비게이션
 *     index.ts
 *
 *   lecture-list/
 *     ui/
 *       LectureList.tsx     - 강의 목록 위젯
 *       LectureGrid.tsx     - 강의 그리드 뷰
 *     model/
 *       useLectureList.ts   - 목록 로직
 *     index.ts
 *
 *   dashboard/
 *     ui/
 *       Dashboard.tsx       - 대시보드 위젯
 *       StatsCard.tsx       - 통계 카드
 *     model/
 *       useDashboard.ts
 *     index.ts
 *
 *   footer/
 *     ui/
 *       Footer.tsx          - 푸터
 *     index.ts
 *
 * 사용 예시:
 * import { Header } from '@/widget/header'
 * import { Sidebar } from '@/widget/sidebar'
 * import { LectureList } from '@/widget/lecture-list'
 *
 * // Layout 구성
 * <>
 *   <Header />
 *   <Sidebar />
 *   <main>
 *     <LectureList />
 *   </main>
 * </>
 */
