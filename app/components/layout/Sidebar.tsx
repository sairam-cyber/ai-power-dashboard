// app/components/layout/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';
import { FaHome, FaChartBar, FaBrain, FaCog, FaUsers, FaCreditCard, FaSignOutAlt, FaGoogle, FaRobot } from 'react-icons/fa';

const Sidebar = () => {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <FaRobot size={40} />
                <span className={styles.logoText}>AI Dash</span>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={`${styles.navItem} ${pathname === '/' ? styles.active : ''}`}>
                    <FaHome /> <span>Dashboard</span>
                </Link>
                <Link href="/analytics" className={`${styles.navItem} ${pathname === '/analytics' ? styles.active : ''}`}>
                    <FaChartBar /> <span>Analytics</span>
                </Link>
                <Link href="/model-insights" className={`${styles.navItem} ${pathname === '/model-insights' ? styles.active : ''}`}>
                    <FaBrain /> <span>Model Insights</span>
                </Link>
                <Link href="/team" className={`${styles.navItem} ${pathname === '/team' ? styles.active : ''}`}>
                    <FaUsers />
                    Team
                </Link>
                <Link href="/billing" className={`${styles.navItem} ${pathname === '/billing' ? styles.active : ''}`}>
                    <FaCreditCard />
                    Billing
                </Link>
                <Link href="/google-services" className={`${styles.navItem} ${pathname === '/google-services' ? styles.active : ''}`}>
                    <FaGoogle />
                    Google APIs
                </Link>
                <Link href="/settings" className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}>
                    <FaCog /> <span>Settings</span>
                </Link>
            </nav>
            
            <div className={styles.userSection}>
                <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                        <div className={styles.userName}>{user?.name}</div>
                        <div className={styles.userRole}>{user?.role}</div>
                    </div>
                </div>
                <button onClick={logout} className={styles.logoutButton}>
                    <FaSignOutAlt />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;