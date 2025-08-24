'use client';
import { useState, useEffect } from 'react';
import styles from './model-insights.module.css';
import { FaBrain, FaClock, FaChartLine, FaMemory, FaPlay, FaFlask, FaRocket } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// Mock data generators
const generateRealtimeData = () => {
  const now = Date.now();
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now - (19 - i) * 5000).toLocaleTimeString(),
    inferenceSpeed: Math.random() * 50 + 100,
    accuracy: Math.random() * 5 + 92,
    cpuUsage: Math.random() * 30 + 40,
    memoryUsage: Math.random() * 20 + 60,
  }));
};

const generateABTestData = () => ({
  modelA: {
    accuracy: 94.2,
    speed: 125,
    throughput: 1250,
    errorRate: 2.1,
  },
  modelB: {
    accuracy: 96.1,
    speed: 98,
    throughput: 980,
    errorRate: 1.4,
  }
});

export default function ModelInsights() {
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData());
  const [abTestData] = useState(generateABTestData());
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(generateRealtimeData());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaygroundSubmit = async () => {
    if (!playgroundInput.trim()) return;
    
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      const mockResponses = [
        "Based on the input data, I predict a 78% probability of positive sentiment with high confidence.",
        "The model suggests this text belongs to the 'Technology' category with 92% certainty.",
        "Analysis complete: The input shows patterns consistent with anomalous behavior (confidence: 85%).",
        "Classification result: This appears to be a legitimate transaction with risk score: 0.12",
      ];
      setPlaygroundOutput(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Model Insights</h1>
        <div className={styles.statusIndicator}>
          <div className={styles.statusDot}></div>
          <span>Live Monitoring Active</span>
        </div>
      </div>

      {/* Real-time Monitoring Section */}
      <section className={styles.monitoringSection}>
        <h2 className={styles.sectionTitle}>Real-time Performance Monitoring</h2>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FaClock className={styles.metricIcon} />
              <h3>Inference Speed</h3>
            </div>
            <div className={styles.metricValue}>
              {realtimeData[realtimeData.length - 1]?.inferenceSpeed.toFixed(1)}ms
            </div>
            <div className={styles.metricTrend}>+2.3% from last hour</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FaChartLine className={styles.metricIcon} />
              <h3>Accuracy</h3>
            </div>
            <div className={styles.metricValue}>
              {realtimeData[realtimeData.length - 1]?.accuracy.toFixed(1)}%
            </div>
            <div className={styles.metricTrend}>-0.1% from last hour</div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FaMemory className={styles.metricIcon} />
              <h3>Memory Usage</h3>
            </div>
            <div className={styles.metricValue}>
              {realtimeData[realtimeData.length - 1]?.memoryUsage.toFixed(1)}%
            </div>
            <div className={styles.metricTrend}>+1.2% from last hour</div>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartCard}>
            <h3>Inference Speed Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="inferenceSpeed" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chartCard}>
            <h3>Resource Utilization</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Area type="monotone" dataKey="cpuUsage" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="memoryUsage" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Live Playground Section */}
      <section className={styles.playgroundSection}>
        <h2 className={styles.sectionTitle}>
          <FaPlay className={styles.sectionIcon} />
          Live Playground
        </h2>
        
        <div className={styles.playgroundContainer}>
          <div className={styles.playgroundControls}>
            <select 
              value={selectedModel} 
              onChange={(e) => setSelectedModel(e.target.value)}
              className={styles.modelSelect}
            >
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude-3</option>
              <option value="custom-model">Custom Model</option>
            </select>
          </div>

          <div className={styles.playgroundGrid}>
            <div className={styles.inputSection}>
              <h4>Input</h4>
              <textarea
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                placeholder="Enter your test data here..."
                className={styles.playgroundTextarea}
                rows={8}
              />
              <button 
                onClick={handlePlaygroundSubmit}
                disabled={isProcessing || !playgroundInput.trim()}
                className={styles.submitButton}
              >
                {isProcessing ? (
                  <>
                    <div className={styles.spinner}></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Run Inference
                  </>
                )}
              </button>
            </div>

            <div className={styles.outputSection}>
              <h4>Model Response</h4>
              <div className={styles.playgroundOutput}>
                {playgroundOutput || 'Model output will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A/B Testing Section */}
      <section className={styles.abTestSection}>
        <h2 className={styles.sectionTitle}>
          <FaFlask className={styles.sectionIcon} />
          A/B Model Comparison
        </h2>
        
        <div className={styles.abTestGrid}>
          <div className={styles.modelComparisonCard}>
            <div className={styles.modelHeader}>
              <h3>Model A (Current)</h3>
              <span className={styles.modelBadge}>Production</span>
            </div>
            <div className={styles.comparisonMetrics}>
              <div className={styles.comparisonMetric}>
                <span>Accuracy</span>
                <span className={styles.metricValue}>{abTestData.modelA.accuracy}%</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Avg Speed</span>
                <span className={styles.metricValue}>{abTestData.modelA.speed}ms</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Throughput</span>
                <span className={styles.metricValue}>{abTestData.modelA.throughput}/hr</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Error Rate</span>
                <span className={styles.metricValue}>{abTestData.modelA.errorRate}%</span>
              </div>
            </div>
          </div>

          <div className={styles.modelComparisonCard}>
            <div className={styles.modelHeader}>
              <h3>Model B (Candidate)</h3>
              <span className={styles.modelBadge}>Testing</span>
            </div>
            <div className={styles.comparisonMetrics}>
              <div className={styles.comparisonMetric}>
                <span>Accuracy</span>
                <span className={styles.metricValue}>{abTestData.modelB.accuracy}%</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Avg Speed</span>
                <span className={styles.metricValue}>{abTestData.modelB.speed}ms</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Throughput</span>
                <span className={styles.metricValue}>{abTestData.modelB.throughput}/hr</span>
              </div>
              <div className={styles.comparisonMetric}>
                <span>Error Rate</span>
                <span className={styles.metricValue}>{abTestData.modelB.errorRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.comparisonChart}>
          <h4>Performance Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { metric: 'Accuracy', ModelA: abTestData.modelA.accuracy, ModelB: abTestData.modelB.accuracy },
              { metric: 'Speed', ModelA: abTestData.modelA.speed, ModelB: abTestData.modelB.speed },
              { metric: 'Throughput', ModelA: abTestData.modelA.throughput / 10, ModelB: abTestData.modelB.throughput / 10 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="metric" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="ModelA" fill="#3B82F6" />
              <Bar dataKey="ModelB" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
