export interface SortObject {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject[];
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}

export interface CourseResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  topicCount: number;
  subtopicCount: number;
}

export type PageCourseResponse = Page<CourseResponse>;

export interface TopicResponse {
  id: number;
  slug: string;
  title: string;
  courseId: number;
}

export type PageTopicResponse = Page<TopicResponse>;

export interface SubtopicSummaryResponse {
  id: number;
  topicId: number;
  title: string;
}

export type PageSubtopicSummaryResponse = Page<SubtopicSummaryResponse>;

export interface SubtopicResponse {
  id: number;
  slug: string;
  topicId: number;
  title: string;
  content: string;
}

export interface RegisterRequest {
  email?: string;
  password?: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface JwtResponse {
  token: string;
  email: string;
  expiresIn: string;
}

export interface CourseRequest {
  slug?: string;
  title?: string;
  description?: string;
}

export interface TopicRequest {
  slug?: string;
  title?: string;
}

export interface SubtopicRequest {
  slug?: string;
  title?: string;
  content?: string;
}

export interface EnrollmentResponse {
  userId: number;
  courseId: number;
  message: string;
}
