'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaGoogle, FaRobot, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import GoogleSignIn from '../components/GoogleSignIn';
import styles from './signup.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const { signup, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signup(formData.email, formData.password, formData.name, formData.confirmPassword);
      if (result.success) {
        // Force a page reload to ensure proper redirect
        window.location.href = '/';
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // Import Google API configuration
      const { getGoogleApiKey } = await import('../../config/api');
      const apiKey = getGoogleApiKey();
      
      // For now, use demo admin account (replace with actual Google OAuth later)
      console.log('Google API Key configured:', apiKey ? 'Yes' : 'No');
      const result = await signup('admin@aipower.com', 'admin123', 'Admin User', 'admin123');
      if (result.success) {
        window.location.href = '/';
      } else {
        setError('Google sign-up failed');
      }
    } catch (error) {
      setError('Google sign-up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <FaRobot size={48} />
            <h1>AI Dash</h1>
          </div>
          <h2>Create Account</h2>
          <p>Join thousands of users building with AI</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaEnvelope className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
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
                name="password"
                placeholder="Password (min. 8 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
                required
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                required
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.termsGroup}>
            <label className={styles.checkbox}>
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span className={styles.checkmark}></span>
              I agree to the{' '}
              <Link href="/terms" className={styles.link}>Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            </label>
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
              'Create Account'
            )}
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <GoogleSignIn
            onSuccess={() => window.location.href = '/'}
            onError={setError}
            buttonText="Sign up with Google"
          />

          <div className={styles.footer}>
            <p>
              Already have an account?{' '}
              <Link href="/login" className={styles.loginLink}>
                Sign in
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
