/**
 * ⚡ FEATURES (기능)
 *
 * 사용자 시나리오와 비즈니스 가치를 제공하는 기능들을 담는 레이어입니다.
 * 사용자의 액션과 인터랙션을 처리합니다.
 *
 * 특징:
 * - 사용자 스토리/유스케이스 구현
 * - entities를 조합하여 비즈니스 로직 구현
 * - 다른 features에 의존하지 않음 (독립적)
 * - widgets, pages에서 사용 가능
 *
 * 구조 예시:
 * features/
 *   auth/
 *     login/
 *       ui/
 *         LoginForm.tsx     - 로그인 폼
 *       model/
 *         useLogin.ts       - 로그인 로직 훅
 *       api/
 *         loginApi.ts       - 로그인 API
 *       index.ts
 *     register/
 *       ui/
 *         RegisterForm.tsx  - 회원가입 폼
 *       model/
 *         useRegister.ts
 *       index.ts
 *
 *   lecture-enrollment/
 *     ui/
 *       EnrollButton.tsx    - 강의 등록 버튼
 *     model/
 *       useEnrollment.ts    - 등록 로직
 *     api/
 *       enrollmentApi.ts    - 등록 API
 *     index.ts
 *
 *   lecture-search/
 *     ui/
 *       SearchBar.tsx       - 검색창
 *       SearchFilters.tsx   - 검색 필터
 *     model/
 *       useSearch.ts        - 검색 로직
 *     index.ts
 *
 * 사용 예시:
 * import { LoginForm } from '@/features/auth/login'
 * import { EnrollButton } from '@/features/lecture-enrollment'
 * import { SearchBar } from '@/features/lecture-search'
 */
