// app/components/dashboard/Card.tsx
import styles from './Card.module.css';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
}

const Card: React.FC<CardProps> = ({ icon, title, value, change }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.value}>{value}</div>
      <div className={styles.footer}>
        <span className={styles.change}>{change}</span>
        <span className={styles.period}>vs. last month</span>
      </div>
    </div>
  );
};

export default Card;