import { useEffect, useState } from 'react';
import { getAllCourses } from './courseService';
import { CourseResponse } from './types';
import CourseCard from './CourseCard';
import Spinner from './Spinner';

export default function HomePage() {
  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        const normalizedCourses = Array.isArray(response)
          ? response
          : Array.isArray(response?.content)
          ? response.content
          : [];

        setCourses(normalizedCourses);
      } catch (error) {
        console.error('Failed to fetch courses', error);
        setCourses([]);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(courses ?? []).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

