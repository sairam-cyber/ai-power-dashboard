'use client';
import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './layout/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import styles from './layout/Layout.module.css';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // Show full-page layout for auth pages
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show loading spinner during auth check
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--background-dark)',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(102, 126, 234, 0.3)',
          borderTop: '4px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Protected dashboard layout
  return (
    <ProtectedRoute>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
