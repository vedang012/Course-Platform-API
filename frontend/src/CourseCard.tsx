import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { CourseResponse } from './types';

interface CourseCardProps {
  course: CourseResponse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{course.topicCount} Topics</span>
            <span>{course.subtopicCount} Subtopics</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
