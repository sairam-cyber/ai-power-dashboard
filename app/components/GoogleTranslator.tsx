'use client';
import { useState } from 'react';
import { FaLanguage, FaExchangeAlt, FaCopy, FaSpinner } from 'react-icons/fa';
import styles from './GoogleTranslator.module.css';

interface TranslationResult {
  success: boolean;
  translation?: string;
  detectedSourceLanguage?: string;
  originalText?: string;
  targetLanguage?: string;
  error?: string;
}

const LANGUAGES = [
  { code: 'auto', name: 'Auto-detect' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

export default function GoogleTranslator() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/google/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage,
          sourceLanguage: sourceLanguage === 'auto' ? undefined : sourceLanguage,
        }),
      });

      const data: TranslationResult = await response.json();

      if (data.success && data.translation) {
        setTranslatedText(data.translation);
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLanguage !== 'auto') {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaLanguage className={styles.icon} />
        <h2>Google Translator</h2>
      </div>

      <div className={styles.languageSelector}>
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className={styles.select}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleSwapLanguages}
          className={styles.swapButton}
          disabled={sourceLanguage === 'auto'}
        >
          <FaExchangeAlt />
        </button>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className={styles.select}
        >
          {LANGUAGES.filter(lang => lang.code !== 'auto').map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.textAreas}>
        <div className={styles.textSection}>
          <div className={styles.textHeader}>
            <span>Source Text</span>
            <button
              onClick={() => copyToClipboard(sourceText)}
              className={styles.copyButton}
              disabled={!sourceText}
            >
              <FaCopy />
            </button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className={styles.textarea}
            rows={6}
          />
        </div>

        <div className={styles.textSection}>
          <div className={styles.textHeader}>
            <span>Translation</span>
            <button
              onClick={() => copyToClipboard(translatedText)}
              className={styles.copyButton}
              disabled={!translatedText}
            >
              <FaCopy />
            </button>
          </div>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
            className={`${styles.textarea} ${styles.readonly}`}
            rows={6}
          />
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <button
        onClick={handleTranslate}
        disabled={isLoading || !sourceText.trim()}
        className={styles.translateButton}
      >
        {isLoading ? (
          <>
            <FaSpinner className={styles.spinner} />
            Translating...
          </>
        ) : (
          'Translate'
        )}
      </button>
    </div>
  );
}
