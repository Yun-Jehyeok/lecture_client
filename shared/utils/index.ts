/**
 * 🛠️ SHARED / UTILS
 *
 * 애플리케이션 전체에서 재사용 가능한 유틸리티 함수들을 담는 폴더입니다.
 * 비즈니스 로직이 없는 순수 함수들만 포함합니다.
 *
 * 예시:
 *
 * // format.ts - 포맷팅 유틸
 * export function formatDate(date: Date, format: string): string {
 *   // 날짜 포맷팅 로직
 *   return new Intl.DateTimeFormat('ko-KR').format(date)
 * }
 *
 * export function formatCurrency(amount: number, currency = 'KRW'): string {
 *   return new Intl.NumberFormat('ko-KR', {
 *     style: 'currency',
 *     currency,
 *   }).format(amount)
 * }
 *
 * export function formatFileSize(bytes: number): string {
 *   const units = ['B', 'KB', 'MB', 'GB']
 *   let size = bytes
 *   let unitIndex = 0
 *
 *   while (size >= 1024 && unitIndex < units.length - 1) {
 *     size /= 1024
 *     unitIndex++
 *   }
 *
 *   return `${size.toFixed(2)} ${units[unitIndex]}`
 * }
 *
 * // validation.ts - 검증 유틸
 * export function isEmail(value: string): boolean {
 *   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
 * }
 *
 * export function isPhoneNumber(value: string): boolean {
 *   return /^\d{3}-\d{3,4}-\d{4}$/.test(value)
 * }
 *
 * export function isUrl(value: string): boolean {
 *   try {
 *     new URL(value)
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 *
 * // string.ts - 문자열 유틸
 * export function truncate(str: string, length: number): string {
 *   return str.length > length ? str.slice(0, length) + '...' : str
 * }
 *
 * export function capitalize(str: string): string {
 *   return str.charAt(0).toUpperCase() + str.slice(1)
 * }
 *
 * export function slugify(str: string): string {
 *   return str
 *     .toLowerCase()
 *     .replace(/[^a-z0-9]+/g, '-')
 *     .replace(/(^-|-$)/g, '')
 * }
 *
 * // array.ts - 배열 유틸
 * export function chunk<T>(array: T[], size: number): T[][] {
 *   return Array.from(
 *     { length: Math.ceil(array.length / size) },
 *     (_, i) => array.slice(i * size, i * size + size)
 *   )
 * }
 *
 * export function unique<T>(array: T[]): T[] {
 *   return Array.from(new Set(array))
 * }
 */
