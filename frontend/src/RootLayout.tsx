import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
