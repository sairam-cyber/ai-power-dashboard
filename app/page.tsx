// app/page.tsx
import styles from './page.module.css';
import Card from './components/layout/dashboard/Card';
import { FaUsers, FaChartLine, FaBrain, FaDollarSign } from 'react-icons/fa';

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>AI Power Dashboard</h1>
      <div className={styles.cards}>
        <Card
          icon={<FaUsers size={24} />}
          title="Active Users"
          value="1,234"
          change="+5.4%"
        />
        <Card
          icon={<FaChartLine size={24} />}
          title="Model Performance"
          value="98.7%"
          change="+1.2%"
        />
        <Card
          icon={<FaBrain size={24} />}
          title="API Calls"
          value="56,789"
          change="+12.8%"
        />
        <Card
          icon={<FaDollarSign size={24} />}
          title="Revenue"
          value="$12,345"
          change="+8.2%"
        />
      </div>
    </div>
  );
}