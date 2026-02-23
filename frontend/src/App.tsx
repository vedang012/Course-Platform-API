/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';
import RootLayout from './RootLayout';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import CourseDetailPage from './CourseDetailPage';
import TopicDetailPage from './TopicDetailPage';
import SubtopicDetailPage from './SubtopicDetailPage';
import CreateCoursePage from './CreateCoursePage';

import NotFoundPage from './NotFoundPage';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses/new" element={<ProtectedRoute><CreateCoursePage /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/topics/:topicSlug" element={<TopicDetailPage />} />
        <Route path="/courses/:courseId/topics/:topicSlug/subtopics/:subtopicSlug" element={<SubtopicDetailPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
