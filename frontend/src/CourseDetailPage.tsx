import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById, getTopicsByCourseId, enrollInCourse, createTopic } from './courseService';
import { CourseResponse, TopicResponse } from './types';
import Spinner from './Spinner';
import TopicAccordion from './TopicAccordion';
import { useAuth } from './AuthContext';
import { Button } from './Button';
import { Input } from './Input';
import toast from 'react-hot-toast';
import { generateUniqueSlug } from './slug';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      try {
        const parsedCourseId = Number.parseInt(courseId, 10);
        if (Number.isNaN(parsedCourseId)) {
          setLoading(false);
          return;
        }

        const courseData = await getCourseById(parsedCourseId);
        setCourse(courseData);
        const topicsData = await getTopicsByCourseId(courseData.id);
        setTopics(topicsData);
      } catch (error) {
        console.error('Failed to fetch course data', error);
      }
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

  const handleEnroll = async () => {
    if (!course) return;
    try {
      await enrollInCourse(course.id);
      toast.success(`Successfully enrolled in ${course.title}!`);
    } catch (error) {
      toast.error('Failed to enroll. You may already be enrolled.');
      console.error(error);
    }
  };

  const handleCreateTopic = async () => {
    if (!course || !newTopicTitle.trim()) {
      return;
    }

    try {
      setCreatingTopic(true);
      const topicTitle = newTopicTitle.trim();
      const createdTopic = await createTopic(course.id, {
        title: topicTitle,
        slug: generateUniqueSlug(topicTitle),
      });
      setTopics((current) => [...current, createdTopic]);
      setNewTopicTitle('');
      toast.success('Topic created successfully!');
    } catch (error) {
      toast.error('Failed to create topic. Please try again.');
      console.error(error);
    } finally {
      setCreatingTopic(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg text-muted-foreground">{course.description}</p>
        </div>
        {isAuthenticated && (
          <Button onClick={handleEnroll}>Enroll in Course</Button>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Topics</h2>
        {isAdmin && (
          <div className="flex w-full gap-2 md:w-auto">
            <Input
              placeholder="New topic title"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
            />
            <Button onClick={handleCreateTopic} disabled={creatingTopic || !newTopicTitle.trim()}>
              {creatingTopic ? 'Creating...' : 'Create Topic'}
            </Button>
          </div>
        )}
      </div>
      <div>
        {topics.map((topic) => (
          <TopicAccordion key={topic.id} topic={topic} courseId={course.id} />
        ))}
      </div>
    </div>
  );
}


