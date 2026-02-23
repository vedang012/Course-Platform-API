import apiClient from './apiClient';
import { PageCourseResponse, PageTopicResponse, PageSubtopicSummaryResponse, CourseResponse, TopicResponse, SubtopicResponse, SubtopicSummaryResponse, CourseRequest, TopicRequest, SubtopicRequest, EnrollmentResponse } from './types';

type PagedOrArray<T> = T[] | { content?: T[] };

const toIntId = (value: number): number => Number.parseInt(String(value), 10);

const toArray = <T>(data: PagedOrArray<T>): T[] => {
  if (Array.isArray(data)) {
    return data;
  }

  return Array.isArray(data?.content) ? data.content : [];
};

export const getAllCourses = async (page = 0, size = 10): Promise<PageCourseResponse> => {
  const response = await apiClient.get<PageCourseResponse>(`/api/courses/?page=${page}&size=${size}`, { skipAuth: true });
  return response.data;
};

export const getCourseById = async (courseId: number): Promise<CourseResponse> => {
  const response = await apiClient.get<CourseResponse>(`/api/courses/${toIntId(courseId)}`, { skipAuth: true });
  return response.data;
};

export const createCourse = async (data: CourseRequest): Promise<CourseResponse> => {
  const response = await apiClient.post<CourseResponse>('/api/courses', data);
  return response.data;
};

export const getTopicsByCourseId = async (courseId: number): Promise<TopicResponse[]> => {
  const response = await apiClient.get<PageTopicResponse | TopicResponse[]>(`/api/courses/${toIntId(courseId)}/topics`, { skipAuth: true });
  return toArray(response.data);
};

export const createTopic = async (courseId: number, data: TopicRequest): Promise<TopicResponse> => {
  const response = await apiClient.post<TopicResponse>(`/api/courses/${toIntId(courseId)}/topics`, data);
  return response.data;
};

export const getSubtopicsByTopicId = async (topicId: number): Promise<SubtopicSummaryResponse[]> => {
  const response = await apiClient.get<PageSubtopicSummaryResponse | SubtopicSummaryResponse[]>(`/api/courses/topics/${toIntId(topicId)}/subtopics`, { skipAuth: true });
  return toArray(response.data);
};

export const createSubtopic = async (topicId: number, data: SubtopicRequest): Promise<SubtopicResponse> => {
  const response = await apiClient.post<SubtopicResponse>(`/api/courses/topics/${toIntId(topicId)}/subtopics`, data);
  return response.data;
};

export const getTopicBySlug = async (slug: string): Promise<TopicResponse> => {
  const response = await apiClient.get<TopicResponse>(`/api/topics/slug/${slug}`, { skipAuth: true });
  return response.data;
};

export const getSubtopicById = async (id: number): Promise<SubtopicResponse> => {
  const response = await apiClient.get<SubtopicResponse>(`/api/courses/subtopics/${toIntId(id)}`, { skipAuth: true });
  return response.data;
};

export const enrollInCourse = async (courseId: number): Promise<EnrollmentResponse> => {
  const response = await apiClient.post<EnrollmentResponse>(`/api/courses/${toIntId(courseId)}/enroll`);
  return response.data;
};
