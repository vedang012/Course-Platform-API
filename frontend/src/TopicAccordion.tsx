import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TopicResponse, SubtopicSummaryResponse } from './types';
import { createSubtopic, getSubtopicsByTopicId } from './courseService';
import { useAuth } from './AuthContext';
import { Input } from './Input';
import { Button } from './Button';
import toast from 'react-hot-toast';
import { generateUniqueSlug } from './slug';

interface TopicAccordionProps {
  topic: TopicResponse;
  courseId: number;
}

export default function TopicAccordion({ topic, courseId }: TopicAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subtopics, setSubtopics] = useState<SubtopicSummaryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSubtopicTitle, setNewSubtopicTitle] = useState('');
  const [newSubtopicContent, setNewSubtopicContent] = useState('');
  const [creatingSubtopic, setCreatingSubtopic] = useState(false);
  const { isAdmin } = useAuth();

  const toggleOpen = async () => {
    if (!isOpen && subtopics.length === 0) {
      setLoading(true);
      try {
        const fetchedSubtopics = await getSubtopicsByTopicId(topic.id);
        setSubtopics(fetchedSubtopics);
      } catch (error) {
        console.error('Failed to fetch subtopics', error);
      }
      setLoading(false);
    }
    setIsOpen(!isOpen);
  };

  const handleCreateSubtopic = async () => {
    const title = newSubtopicTitle.trim();
    const content = newSubtopicContent;

    if (!title || !content.trim()) {
      return;
    }

    try {
      setCreatingSubtopic(true);
      const createdSubtopic = await createSubtopic(topic.id, {
        title,
        content,
        slug: generateUniqueSlug(title),
      });
      setSubtopics((current) => [
        ...current,
        {
          id: createdSubtopic.id,
          topicId: createdSubtopic.topicId,
          title: createdSubtopic.title,
        },
      ]);
      setNewSubtopicTitle('');
      setNewSubtopicContent('');
      toast.success('Subtopic created successfully!');
    } catch (error) {
      toast.error('Failed to create subtopic. Please try again.');
      console.error(error);
    } finally {
      setCreatingSubtopic(false);
    }
  };

  return (
    <div className="border rounded-md mb-2">
      <button
        onClick={toggleOpen}
        className="w-full text-left p-4 bg-secondary hover:bg-secondary/80 transition-colors flex justify-between items-center"
      >
        <h3 className="font-semibold">{topic.title}</h3>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4">
          {isAdmin && (
            <div className="mb-4 space-y-2">
              <Input
                placeholder="New subtopic title"
                value={newSubtopicTitle}
                onChange={(e) => setNewSubtopicTitle(e.target.value)}
              />
              <textarea
                placeholder="New subtopic content (Markdown supported)"
                value={newSubtopicContent}
                onChange={(e) => setNewSubtopicContent(e.target.value)}
                rows={6}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                onClick={handleCreateSubtopic}
                disabled={creatingSubtopic || !newSubtopicTitle.trim() || !newSubtopicContent.trim()}
              >
                {creatingSubtopic ? 'Creating...' : 'Create Subtopic'}
              </Button>
            </div>
          )}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {subtopics.map((subtopic) => (
                <li key={subtopic.id} className="mb-2">
                  <Link
                    to={`/courses/${courseId}/topics/${topic.slug}/subtopics/${subtopic.id}`}
                    className="hover:underline"
                  >
                    {subtopic.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
