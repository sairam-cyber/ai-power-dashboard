'use client';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './profile.module.css';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Viewer'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email
      });
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handlePasswordChange = async () => {
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
      setShowPasswordForm(false);
      setMessage('Password updated successfully!');
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaUser className={styles.titleIcon} />
            Profile Settings
          </h1>
          <p className={styles.subtitle}>
            Manage your account information and preferences
          </p>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      <div className={styles.profileGrid}>
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <h2>Personal Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className={styles.editButton}
              >
                <FaEdit />
                Edit
              </button>
            ) : (
              <div className={styles.editActions}>
                <button
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className={styles.saveButton}
                >
                  <FaSave />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      role: user?.role || 'Viewer'
                    });
                  }}
                  className={styles.cancelButton}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className={styles.profileContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className={styles.avatarButton}>
                <FaCamera />
                Change Photo
              </button>
            </div>

            <div className={styles.formSection}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Role</label>
                <div className={styles.roleDisplay}>
                  <span className={`${styles.roleBadge} ${formData.role === 'Admin' ? styles.roleAdmin : styles.roleViewer}`}>
                    {formData.role}
                  </span>
                  <span className={styles.roleNote}>
                    Contact an administrator to change your role
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.securityCard}>
          <div className={styles.cardHeader}>
            <h2>Security</h2>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className={styles.editButton}
            >
              <FaLock />
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <div className={styles.passwordForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Current Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    className={styles.input}
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>New Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    className={styles.input}
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirm New Password</label>
                <div className={styles.inputWrapper}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    className={styles.input}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className={styles.passwordActions}>
                <button
                  onClick={handlePasswordChange}
                  disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword}
                  className={styles.updatePasswordButton}
                >
                  <FaCheck />
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className={styles.cancelButton}
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className={styles.securityInfo}>
            <div className={styles.securityItem}>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
              <button className={styles.securityButton}>Enable 2FA</button>
            </div>
            
            <div className={styles.securityItem}>
              <h4>Login Sessions</h4>
              <p>Manage your active login sessions</p>
              <button className={styles.securityButton}>View Sessions</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
