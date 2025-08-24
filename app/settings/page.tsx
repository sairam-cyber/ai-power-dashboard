'use client';
import React, { useState, useEffect } from 'react';
import { settingsApi, userApi } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import styles from './settings.module.css';
import { FaUser, FaBell, FaLock, FaPalette, FaDatabase, FaKey, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

export default function Settings() {
  const { user, updateUser } = useAuth();
  
  const [settings, setSettings] = useState({
    displayName: user?.name || '',
    email: user?.email || '',
    timeZone: 'UTC',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    theme: 'Dark',
    language: 'English',
    apiKey: 'sk-1234567890abcdef...',
    rateLimit: '5000 requests/hour',
    autoBackup: true
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: settings.displayName,
        email: settings.email
      });
      setMessage('Settings saved successfully!');
      setHasChanges(false);
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordModal(false);
      setMessage('Password updated successfully!');
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleRegenerateApiKey = () => {
    const newKey = 'sk-' + Math.random().toString(36).substring(2, 15) + '...';
    handleInputChange('apiKey', newKey);
    setMessage('API key regenerated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        {hasChanges && (
          <div className={styles.changeIndicator}>
            You have unsaved changes
          </div>
        )}
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}
      
      <div className={styles.settingsGrid}>
        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaUser className={styles.sectionIcon} />
            <h2>Profile Settings</h2>
          </div>
          <div className={styles.settingItem}>
            <label>Display Name</label>
            <input 
              type="text" 
              value={settings.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
              placeholder="Enter your display name" 
            />
          </div>
          <div className={styles.settingItem}>
            <label>Email Address</label>
            <input 
              type="email" 
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email" 
            />
          </div>
          <div className={styles.settingItem}>
            <label>Time Zone</label>
            <select 
              value={settings.timeZone}
              onChange={(e) => handleInputChange('timeZone', e.target.value)}
            >
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>GMT</option>
            </select>
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaBell className={styles.sectionIcon} />
            <h2>Notifications</h2>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
              />
              <span className={styles.toggle}></span>
              Email Notifications
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={settings.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
              />
              <span className={styles.toggle}></span>
              Push Notifications
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={settings.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
              />
              <span className={styles.toggle}></span>
              SMS Notifications
            </label>
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaLock className={styles.sectionIcon} />
            <h2>Security</h2>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={settings.twoFactorAuth}
                onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
              />
              <span className={styles.toggle}></span>
              Two-Factor Authentication
            </label>
          </div>
          <div className={styles.settingItem}>
            <button 
              className={styles.actionButton}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
          <div className={styles.settingItem}>
            <button className={styles.actionButton}>Download Data</button>
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaPalette className={styles.sectionIcon} />
            <h2>Appearance</h2>
          </div>
          <div className={styles.settingItem}>
            <label>Theme</label>
            <select 
              value={settings.theme}
              onChange={(e) => handleInputChange('theme', e.target.value)}
            >
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div className={styles.settingItem}>
            <label>Language</label>
            <select 
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaKey className={styles.sectionIcon} />
            <h2>API Settings</h2>
          </div>
          <div className={styles.settingItem}>
            <label>API Key</label>
            <div className={styles.apiKeyContainer}>
              <input type="password" value={settings.apiKey} readOnly />
              <button 
                className={styles.regenerateButton}
                onClick={handleRegenerateApiKey}
              >
                Regenerate
              </button>
            </div>
          </div>
          <div className={styles.settingItem}>
            <label>Rate Limit</label>
            <select 
              value={settings.rateLimit}
              onChange={(e) => handleInputChange('rateLimit', e.target.value)}
            >
              <option>1000 requests/hour</option>
              <option>5000 requests/hour</option>
              <option>10000 requests/hour</option>
            </select>
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionHeader}>
            <FaDatabase className={styles.sectionIcon} />
            <h2>Data Management</h2>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.toggleLabel}>
              <input 
                type="checkbox" 
                checked={settings.autoBackup}
                onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
              />
              <span className={styles.toggle}></span>
              Auto-backup Data
            </label>
          </div>
          <div className={styles.settingItem}>
            <button className={styles.actionButton}>Export All Data</button>
          </div>
          <div className={styles.settingItem}>
            <button className={styles.dangerButton}>Delete All Data</button>
          </div>
        </div>
      </div>

      <div className={styles.saveSection}>
        <button 
          className={styles.saveButton}
          onClick={handleSaveSettings}
          disabled={isLoading || !hasChanges}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <button 
          className={styles.cancelButton}
          onClick={() => {
            setSettings({
              displayName: user?.name || '',
              email: user?.email || '',
              timeZone: 'UTC',
              emailNotifications: true,
              pushNotifications: true,
              smsNotifications: false,
              twoFactorAuth: true,
              theme: 'Dark',
              language: 'English',
              apiKey: 'sk-1234567890abcdef...',
              rateLimit: '5000 requests/hour',
              autoBackup: true
            });
            setHasChanges(false);
          }}
        >
          Cancel
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Change Password</h2>
              <button
                onClick={() => setShowPasswordModal(false)}
                className={styles.closeModal}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.inputGroup}>
                <label>Current Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className={styles.passwordToggle}
                  >
                    {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>New Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className={styles.passwordToggle}
                  >
                    {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Confirm New Password</label>
                <div className={styles.passwordWrapper}>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className={styles.passwordToggle}
                  >
                    {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={() => setShowPasswordModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordUpdate}
                disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                className={styles.updateButton}
              >
                <FaCheck />
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
