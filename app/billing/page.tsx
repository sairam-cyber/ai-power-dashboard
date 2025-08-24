'use client';
import { useState } from 'react';
import styles from './billing.module.css';
import { FaCreditCard, FaDownload, FaCheck, FaTimes, FaChartLine, FaExclamationTriangle, FaRocket, FaCrown, FaStar } from 'react-icons/fa';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  period: string;
  downloadUrl?: string;
}

interface UsageData {
  current: number;
  limit: number;
  percentage: number;
}

export default function BillingUsage() {
  const [currentPlan] = useState({
    name: 'Professional',
    price: 49,
    period: 'month',
    features: [
      '100,000 API calls/month',
      'Advanced analytics',
      'Team collaboration',
      'Priority support',
      'Custom integrations'
    ]
  });

  const [usage] = useState({
    apiCalls: { current: 67500, limit: 100000, percentage: 67.5 },
    storage: { current: 2.3, limit: 10, percentage: 23 },
    teamMembers: { current: 3, limit: 10, percentage: 30 }
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-003',
      date: '2024-03-01',
      amount: 49.00,
      status: 'Paid',
      period: 'March 2024'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      amount: 49.00,
      status: 'Paid',
      period: 'February 2024'
    },
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      amount: 49.00,
      status: 'Paid',
      period: 'January 2024'
    }
  ]);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: 19,
      period: 'month',
      description: 'Perfect for individuals and small projects',
      features: [
        '25,000 API calls/month',
        'Basic analytics',
        'Email support',
        '5GB storage',
        '3 team members'
      ],
      icon: <FaRocket />,
      popular: false
    },
    {
      name: 'Professional',
      price: 49,
      period: 'month',
      description: 'Great for growing teams and businesses',
      features: [
        '100,000 API calls/month',
        'Advanced analytics',
        'Team collaboration',
        'Priority support',
        'Custom integrations',
        '25GB storage',
        '10 team members'
      ],
      icon: <FaStar />,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 149,
      period: 'month',
      description: 'For large organizations with custom needs',
      features: [
        'Unlimited API calls',
        'Custom analytics',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations',
        'Unlimited storage',
        'Unlimited team members',
        'White-label options'
      ],
      icon: <FaCrown />,
      popular: false
    }
  ];

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#22c55e';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <FaCheck className={styles.statusPaid} />;
      case 'Pending':
        return <FaExclamationTriangle className={styles.statusPending} />;
      case 'Failed':
        return <FaTimes className={styles.statusFailed} />;
      default:
        return null;
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // Create a mock PDF download
    const element = document.createElement('a');
    const fileContent = `Invoice ${invoice.id}\nDate: ${invoice.date}\nPeriod: ${invoice.period}\nAmount: $${invoice.amount.toFixed(2)}\nStatus: ${invoice.status}`;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `invoice-${invoice.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaCreditCard className={styles.titleIcon} />
            Billing & Usage
          </h1>
          <p className={styles.subtitle}>
            Manage your subscription, track usage, and view billing history
          </p>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className={styles.upgradeButton}
        >
          <FaRocket />
          Upgrade Plan
        </button>
      </div>

      <div className={styles.currentPlanSection}>
        <div className={styles.planCard}>
          <div className={styles.planHeader}>
            <div className={styles.planInfo}>
              <h2 className={styles.planName}>{currentPlan.name} Plan</h2>
              <div className={styles.planPrice}>
                <span className={styles.price}>${currentPlan.price}</span>
                <span className={styles.period}>/{currentPlan.period}</span>
              </div>
            </div>
            <div className={styles.planBadge}>Current Plan</div>
          </div>
          <div className={styles.planFeatures}>
            {currentPlan.features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <FaCheck className={styles.featureIcon} />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.usageSection}>
        <h2 className={styles.sectionTitle}>Current Usage</h2>
        <div className={styles.usageGrid}>
          <div className={styles.usageCard}>
            <div className={styles.usageHeader}>
              <h3>API Calls</h3>
              <span className={styles.usageNumbers}>
                {formatNumber(usage.apiCalls.current)} / {formatNumber(usage.apiCalls.limit)}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${usage.apiCalls.percentage}%`,
                  backgroundColor: getUsageColor(usage.apiCalls.percentage)
                }}
              ></div>
            </div>
            <div className={styles.usagePercentage}>
              {usage.apiCalls.percentage}% used
            </div>
          </div>

          <div className={styles.usageCard}>
            <div className={styles.usageHeader}>
              <h3>Storage</h3>
              <span className={styles.usageNumbers}>
                {usage.storage.current}GB / {usage.storage.limit}GB
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${usage.storage.percentage}%`,
                  backgroundColor: getUsageColor(usage.storage.percentage)
                }}
              ></div>
            </div>
            <div className={styles.usagePercentage}>
              {usage.storage.percentage}% used
            </div>
          </div>

          <div className={styles.usageCard}>
            <div className={styles.usageHeader}>
              <h3>Team Members</h3>
              <span className={styles.usageNumbers}>
                {usage.teamMembers.current} / {usage.teamMembers.limit}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${usage.teamMembers.percentage}%`,
                  backgroundColor: getUsageColor(usage.teamMembers.percentage)
                }}
              ></div>
            </div>
            <div className={styles.usagePercentage}>
              {usage.teamMembers.percentage}% used
            </div>
          </div>
        </div>
      </div>

      <div className={styles.invoiceSection}>
        <h2 className={styles.sectionTitle}>Invoice History</h2>
        <div className={styles.invoiceTable}>
          <div className={styles.invoiceHeader}>
            <div>Invoice ID</div>
            <div>Date</div>
            <div>Period</div>
            <div>Amount</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {invoices.map((invoice) => (
            <div key={invoice.id} className={styles.invoiceRow}>
              <div className={styles.invoiceId}>{invoice.id}</div>
              <div>{new Date(invoice.date).toLocaleDateString()}</div>
              <div>{invoice.period}</div>
              <div className={styles.amount}>${invoice.amount.toFixed(2)}</div>
              <div className={styles.status}>
                {getStatusIcon(invoice.status)}
                {invoice.status}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.downloadButton}
                  onClick={() => handleDownloadInvoice(invoice)}
                >
                  <FaDownload />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUpgradeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Choose Your Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className={styles.closeModal}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.plansGrid}>
                {plans.map((plan) => (
                  <div 
                    key={plan.name} 
                    className={`${styles.planOption} ${plan.popular ? styles.popularPlan : ''}`}
                  >
                    {plan.popular && (
                      <div className={styles.popularBadge}>Most Popular</div>
                    )}
                    <div className={styles.planIcon}>{plan.icon}</div>
                    <h3 className={styles.planOptionName}>{plan.name}</h3>
                    <div className={styles.planOptionPrice}>
                      <span className={styles.price}>${plan.price}</span>
                      <span className={styles.period}>/{plan.period}</span>
                    </div>
                    <p className={styles.planDescription}>{plan.description}</p>
                    <ul className={styles.planOptionFeatures}>
                      {plan.features.map((feature, index) => (
                        <li key={index}>
                          <FaCheck className={styles.featureCheck} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className={`${styles.selectPlanButton} ${
                        plan.name === currentPlan.name ? styles.currentPlanButton : ''
                      }`}
                      disabled={plan.name === currentPlan.name}
                    >
                      {plan.name === currentPlan.name ? 'Current Plan' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
