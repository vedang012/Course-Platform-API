import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SubtopicResponse } from './types';
import Spinner from './Spinner';

import { getSubtopicById } from './courseService';

const normalizeMarkdownContent = (content: string): string => {
  return content
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .replace(/\s*\*\*\*\s*/g, '\n\n***\n\n')
    .trim();
};

export default function SubtopicDetailPage() {
  const { subtopicSlug } = useParams<{ subtopicSlug: string }>();
  const [subtopic, setSubtopic] = useState<SubtopicResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubtopic = async () => {
      if (!subtopicSlug) return;
      try {
        const subtopicId = parseInt(subtopicSlug, 10);
        const subtopicData = await getSubtopicById(subtopicId);
        setSubtopic(subtopicData);
      } catch (error) {
        console.error('Failed to fetch subtopic', error);
      }
      setLoading(false);
    };

    fetchSubtopic();
  }, [subtopicSlug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (!subtopic) {
    return <div>Subtopic not found</div>;
  }

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-4">{subtopic.title}</h1>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            hr: () => <hr className="my-8" />,
            ul: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
            li: ({ children }) => <li className="my-1">{children}</li>,
            pre: ({ children }) => (
              <pre className="my-4 overflow-x-auto rounded-md bg-foreground p-4 text-background">
                {children}
              </pre>
            ),
            code: ({ inline, className, children, ...props }) =>
              inline ? (
                <code className="rounded bg-secondary px-1 py-0.5" {...props}>
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              ),
          }}
        >
          {normalizeMarkdownContent(subtopic.content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}

