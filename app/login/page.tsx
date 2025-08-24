'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaGoogle, FaRobot, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import GoogleSignIn from '../components/GoogleSignIn';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        // Force a page reload to ensure proper redirect
        window.location.href = '/';
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Import Google API configuration
      const { getGoogleApiKey } = await import('../../config/api');
      const apiKey = getGoogleApiKey();
      
      // For now, use demo admin account (replace with actual Google OAuth later)
      console.log('Google API Key configured:', apiKey ? 'Yes' : 'No');
      const result = await login('admin@aipower.com', 'admin123');
      if (result.success) {
        window.location.href = '/';
      } else {
        setError('Google sign-in failed');
      }
    } catch (error) {
      setError('Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <FaRobot size={48} />
            <h1>AI Dash</h1>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to access your AI-powered dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
                suppressHydrationWarning
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Remember me
            </label>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
            suppressHydrationWarning
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <GoogleSignIn
            onSuccess={() => window.location.href = '/'}
            onError={setError}
            buttonText="Sign in with Google"
          />

          <div className={styles.footer}>
            <p>
              Don't have an account?{' '}
              <Link href="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className={styles.background}>
        <div className={styles.backgroundPattern}></div>
      </div>
    </div>
  );
}
