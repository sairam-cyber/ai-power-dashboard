'use client';
import { useEffect, useState } from 'react';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import styles from './GoogleSignIn.module.css';

declare global {
  interface Window {
    gapi: any;
  }
}

interface GoogleSignInProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  buttonText?: string;
}

export default function GoogleSignIn({ onSuccess, onError, buttonText = 'Sign in with Google' }: GoogleSignInProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google API Platform Library
    const loadGoogleScript = () => {
      if (window.gapi) {
        initializeGoogle();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.head.appendChild(script);
    };

    const initializeGoogle = () => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Demo client ID
          }).then(() => {
            setIsGoogleLoaded(true);
          }).catch((error: any) => {
            console.log('Google Auth initialization error:', error);
            setIsGoogleLoaded(true); // Still allow fallback
          });
        });
      }
    };

    loadGoogleScript();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // For demo purposes, simulate Google OAuth with a mock response
      // In production, this would use actual Google OAuth flow
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock Google user data
      const mockGoogleUser = {
        sub: 'google_' + Date.now(),
        email: 'demo.user@gmail.com',
        name: 'Demo Google User',
        picture: 'https://ui-avatars.com/api/?name=Demo+Google+User&background=4285f4&color=fff',
        email_verified: true
      };

      // Send to our backend API
      const result = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: 'mock_google_token_' + Date.now(),
          userData: mockGoogleUser
        }),
      });

      const data = await result.json();

      if (data.success && data.user) {
        // Update auth context
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');
        
        onSuccess?.();
      } else {
        onError?.(data.error || 'Google sign-in failed');
      }
    } catch (error) {
      onError?.('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className={styles.googleButton}
    >
      {isLoading ? (
        <>
          <FaSpinner className={styles.spinner} />
          Signing in...
        </>
      ) : (
        <>
          <FaGoogle />
          {buttonText}
        </>
      )}
    </button>
  );
}
