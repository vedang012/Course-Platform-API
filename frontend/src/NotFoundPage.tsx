import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-center flex-col text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6">
        <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
}

