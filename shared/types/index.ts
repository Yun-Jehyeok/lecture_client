/**
 * 📐 SHARED / TYPES
 *
 * 애플리케이션 전체에서 공유되는 타입 정의들을 담는 폴더입니다.
 * 범용적이고 도메인에 독립적인 타입들만 포함합니다.
 *
 * 예시:
 *
 * // common.ts - 공통 타입
 * export type Nullable<T> = T | null
 * export type Optional<T> = T | undefined
 * export type ID = string | number
 *
 * export interface PaginationParams {
 *   page: number
 *   pageSize: number
 * }
 *
 * export interface PaginatedResponse<T> {
 *   data: T[]
 *   total: number
 *   page: number
 *   pageSize: number
 * }
 *
 * export type SortOrder = 'asc' | 'desc'
 *
 * export interface SortParams {
 *   sortBy: string
 *   order: SortOrder
 * }
 *
 * // api.ts - API 관련 타입
 * export interface ApiError {
 *   code: string
 *   message: string
 *   details?: Record<string, any>
 * }
 *
 * export interface ApiResponse<T> {
 *   success: boolean
 *   data?: T
 *   error?: ApiError
 * }
 *
 * export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
 *
 * // form.ts - 폼 관련 타입
 * export interface ValidationError {
 *   field: string
 *   message: string
 * }
 *
 * export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
 *
 * // ui.ts - UI 관련 타입
 * export type Size = 'sm' | 'md' | 'lg' | 'xl'
 * export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
 * export type Theme = 'light' | 'dark' | 'system'
 */
