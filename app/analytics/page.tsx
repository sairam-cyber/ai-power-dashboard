// app/analytics/page.tsx
'use client';
import { useState } from 'react';
import styles from './analytics.module.css';
import { FaChartLine, FaUsers, FaArrowUp, FaEye, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Mock data for charts
const userGrowthData = [
  { month: 'Jan', users: 1200, newUsers: 120, returning: 1080 },
  { month: 'Feb', users: 1450, newUsers: 180, returning: 1270 },
  { month: 'Mar', users: 1680, newUsers: 220, returning: 1460 },
  { month: 'Apr', users: 1920, newUsers: 280, returning: 1640 },
  { month: 'May', users: 2150, newUsers: 320, returning: 1830 },
  { month: 'Jun', users: 2380, newUsers: 360, returning: 2020 },
  { month: 'Jul', users: 2620, newUsers: 400, returning: 2220 },
  { month: 'Aug', users: 2847, newUsers: 427, returning: 2420 },
];

const trafficSourcesData = [
  { name: 'Direct', value: 35, color: '#3B82F6' },
  { name: 'Search', value: 28, color: '#10B981' },
  { name: 'Social', value: 22, color: '#F59E0B' },
  { name: 'Referral', value: 10, color: '#EF4444' },
  { name: 'Email', value: 5, color: '#8B5CF6' },
];

const deviceData = [
  { device: 'Desktop', sessions: 1580, percentage: 55.5 },
  { device: 'Mobile', sessions: 980, percentage: 34.4 },
  { device: 'Tablet', sessions: 287, percentage: 10.1 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics Dashboard</h1>
        <div className={styles.controls}>
          <button 
            className={styles.filterButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className={styles.timeSelect}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label>Date Range</label>
            <div className={styles.dateInputs}>
              <input type="date" className={styles.dateInput} />
              <span>to</span>
              <input type="date" className={styles.dateInput} />
            </div>
          </div>
          <div className={styles.filterGroup}>
            <label>Metric</label>
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
              className={styles.metricSelect}
            >
              <option value="users">Users</option>
              <option value="sessions">Sessions</option>
              <option value="pageviews">Page Views</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
        </div>
      )}
      
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaUsers size={32} />
          </div>
          <div className={styles.metricContent}>
            <h3>Total Users</h3>
            <p className={styles.metricValue}>2,847</p>
            <span className={styles.metricChange}>+12.5% from last month</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaEye size={32} />
          </div>
          <div className={styles.metricContent}>
            <h3>Page Views</h3>
            <p className={styles.metricValue}>18,392</p>
            <span className={styles.metricChange}>+8.2% from last month</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaChartLine size={32} />
          </div>
          <div className={styles.metricContent}>
            <h3>Conversion Rate</h3>
            <p className={styles.metricValue}>3.24%</p>
            <span className={styles.metricChange}>+0.8% from last month</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FaArrowUp size={32} />
          </div>
          <div className={styles.metricContent}>
            <h3>Growth Rate</h3>
            <p className={styles.metricValue}>15.7%</p>
            <span className={styles.metricChange}>+2.1% from last month</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>User Growth Over Time</h3>
            <div className={styles.chartControls}>
              <button className={`${styles.chartButton} ${selectedMetric === 'users' ? styles.active : ''}`}
                      onClick={() => setSelectedMetric('users')}>Users</button>
              <button className={`${styles.chartButton} ${selectedMetric === 'newUsers' ? styles.active : ''}`}
                      onClick={() => setSelectedMetric('newUsers')}>New</button>
              <button className={`${styles.chartButton} ${selectedMetric === 'returning' ? styles.active : ''}`}
                      onClick={() => setSelectedMetric('returning')}>Returning</button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
              <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }} />
              <Line type="monotone" dataKey="returning" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Traffic Sources</h3>
            <div className={styles.legendContainer}>
              {trafficSourcesData.map((entry, index) => (
                <div key={index} className={styles.legendItem}>
                  <div className={styles.legendColor} style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={trafficSourcesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
                formatter={(value) => [`${value}%`, 'Traffic Share']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3>Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="device" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="sessions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
