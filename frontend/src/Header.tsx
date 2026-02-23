import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-background border-b border-border px-4 md:px-6 h-14 flex items-center">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-bold text-lg">CoursePlatform</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/courses/new" className="text-sm font-medium hover:underline underline-offset-4">
              Create Course
            </Link>
            <button onClick={logout} className="text-sm font-medium hover:underline underline-offset-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Login
            </Link>
            <Link to="/register" className="text-sm font-medium hover:underline underline-offset-4">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
