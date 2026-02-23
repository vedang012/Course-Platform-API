import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from './courseService';
import { Button } from './Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { Input } from './Input';
import toast from 'react-hot-toast';
import { generateUniqueSlug } from './slug';

export default function CreateCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const autoSlug = generateUniqueSlug(title);
      await createCourse({ slug: autoSlug, title, description });
      toast.success('Course created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create course. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="page-container">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create a New Course</CardTitle>
          <CardDescription>Fill out the details below to create a new course.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Create Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

