/**
 * 🎣 SHARED / HOOKS
 *
 * 애플리케이션 전체에서 재사용 가능한 커스텀 훅들을 담는 폴더입니다.
 * 비즈니스 로직이 없는 범용 훅들만 포함합니다.
 *
 * 예시:
 *
 * // useDebounce.ts
 * export function useDebounce<T>(value: T, delay: number): T {
 *   const [debouncedValue, setDebouncedValue] = useState(value)
 *
 *   useEffect(() => {
 *     const handler = setTimeout(() => setDebouncedValue(value), delay)
 *     return () => clearTimeout(handler)
 *   }, [value, delay])
 *
 *   return debouncedValue
 * }
 *
 * // useLocalStorage.ts
 * export function useLocalStorage<T>(key: string, initialValue: T) {
 *   const [storedValue, setStoredValue] = useState<T>(() => {
 *     try {
 *       const item = window.localStorage.getItem(key)
 *       return item ? JSON.parse(item) : initialValue
 *     } catch (error) {
 *       return initialValue
 *     }
 *   })
 *
 *   const setValue = (value: T) => {
 *     setStoredValue(value)
 *     window.localStorage.setItem(key, JSON.stringify(value))
 *   }
 *
 *   return [storedValue, setValue] as const
 * }
 *
 * // useMediaQuery.ts
 * export function useMediaQuery(query: string): boolean {
 *   const [matches, setMatches] = useState(false)
 *
 *   useEffect(() => {
 *     const media = window.matchMedia(query)
 *     setMatches(media.matches)
 *
 *     const listener = () => setMatches(media.matches)
 *     media.addEventListener('change', listener)
 *     return () => media.removeEventListener('change', listener)
 *   }, [query])
 *
 *   return matches
 * }
 *
 * // useToggle.ts
 * export function useToggle(initialValue = false) {
 *   const [value, setValue] = useState(initialValue)
 *   const toggle = () => setValue(v => !v)
 *   return [value, toggle] as const
 * }
 */
