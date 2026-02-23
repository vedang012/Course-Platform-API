import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicBySlug, getSubtopicsByTopicId, createSubtopic } from './courseService';
import { TopicResponse, SubtopicSummaryResponse } from './types';
import Spinner from './Spinner';
import { useAuth } from './AuthContext';
import { Input } from './Input';
import { Button } from './Button';
import toast from 'react-hot-toast';
import { generateUniqueSlug } from './slug';

export default function TopicDetailPage() {
  const { courseId, topicSlug } = useParams<{ courseId: string; topicSlug: string }>();
  const [topic, setTopic] = useState<TopicResponse | null>(null);
  const [subtopics, setSubtopics] = useState<SubtopicSummaryResponse[]>([]);
  const [newSubtopicTitle, setNewSubtopicTitle] = useState('');
  const [creatingSubtopic, setCreatingSubtopic] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!topicSlug) return;
      try {
        const topicData = await getTopicBySlug(topicSlug);
        setTopic(topicData);
        const subtopicsData = await getSubtopicsByTopicId(topicData.id);
        setSubtopics(subtopicsData);
      } catch (error) {
        console.error('Failed to fetch topic data', error);
      }
      setLoading(false);
    };

    fetchTopicData();
  }, [topicSlug]);

  const handleCreateSubtopic = async () => {
    if (!topic || !newSubtopicTitle.trim()) {
      return;
    }

    try {
      setCreatingSubtopic(true);
      const subtopicTitle = newSubtopicTitle.trim();
      const createdSubtopic = await createSubtopic(topic.id, {
        title: subtopicTitle,
        slug: generateUniqueSlug(subtopicTitle),
      });
      setSubtopics((current) => [...current, { id: createdSubtopic.id, topicId: createdSubtopic.topicId, title: createdSubtopic.title }]);
      setNewSubtopicTitle('');
      toast.success('Subtopic created successfully!');
    } catch (error) {
      toast.error('Failed to create subtopic. Please try again.');
      console.error(error);
    } finally {
      setCreatingSubtopic(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
      <p className="text-lg text-muted-foreground mb-6">Topic content would go here. Below are the subtopics.</p>
      
      <div className="flex flex-col gap-3 mb-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Subtopics</h2>
        {isAdmin && (
          <div className="flex w-full gap-2 md:w-auto">
            <Input
              placeholder="New subtopic title"
              value={newSubtopicTitle}
              onChange={(e) => setNewSubtopicTitle(e.target.value)}
            />
            <Button onClick={handleCreateSubtopic} disabled={creatingSubtopic || !newSubtopicTitle.trim()}>
              {creatingSubtopic ? 'Creating...' : 'Create Subtopic'}
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {subtopics.map((subtopic) => (
          <Link
            key={subtopic.id}
            to={`/courses/${courseId}/topics/${topicSlug}/subtopics/${subtopic.id}`}
            className="block p-4 border rounded-md hover:bg-secondary"
          >
            {subtopic.title}
          </Link>
        ))}
      </div>
    </div>
  );
}


