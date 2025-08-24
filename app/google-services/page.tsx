'use client';
import { useState } from 'react';
import GoogleTranslator from '../components/GoogleTranslator';
import { FaGoogle, FaMap, FaLanguage, FaSearch } from 'react-icons/fa';
import styles from './google-services.module.css';

interface MapResult {
  success: boolean;
  data?: any;
  error?: string;
}

export default function GoogleServices() {
  const [mapQuery, setMapQuery] = useState('');
  const [mapType, setMapType] = useState('places');
  const [mapResults, setMapResults] = useState<MapResult | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);

  const handleMapSearch = async () => {
    if (!mapQuery.trim()) return;

    setIsLoadingMap(true);
    try {
      const params = new URLSearchParams({
        query: mapQuery,
        type: mapType
      });

      const response = await fetch(`/api/google/maps?${params}`);
      const data = await response.json();
      setMapResults(data);
    } catch (error) {
      setMapResults({ success: false, error: 'Search failed' });
    } finally {
      setIsLoadingMap(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <FaGoogle className={styles.titleIcon} />
          Google Services Integration
        </h1>
        <p className={styles.subtitle}>
          Powered by Google APIs using your API key: AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY
        </p>
      </div>

      <div className={styles.servicesGrid}>
        {/* Google Translator Section */}
        <div className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <FaLanguage className={styles.sectionIcon} />
            <h2>Google Translate</h2>
          </div>
          <GoogleTranslator />
        </div>

        {/* Google Maps Section */}
        <div className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <FaMap className={styles.sectionIcon} />
            <h2>Google Maps & Places</h2>
          </div>
          
          <div className={styles.mapService}>
            <div className={styles.searchControls}>
              <select
                value={mapType}
                onChange={(e) => setMapType(e.target.value)}
                className={styles.select}
              >
                <option value="places">Places Search</option>
                <option value="geocode">Geocoding</option>
              </select>
              
              <div className={styles.searchInput}>
                <input
                  type="text"
                  value={mapQuery}
                  onChange={(e) => setMapQuery(e.target.value)}
                  placeholder={mapType === 'places' ? 'Search for places...' : 'Enter address...'}
                  className={styles.input}
                  onKeyPress={(e) => e.key === 'Enter' && handleMapSearch()}
                />
                <button
                  onClick={handleMapSearch}
                  disabled={isLoadingMap || !mapQuery.trim()}
                  className={styles.searchButton}
                >
                  <FaSearch />
                  {isLoadingMap ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {mapResults && (
              <div className={styles.results}>
                {mapResults.success ? (
                  <div className={styles.successResults}>
                    <h3>Search Results:</h3>
                    <pre className={styles.jsonOutput}>
                      {JSON.stringify(mapResults.data, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className={styles.errorResults}>
                    <p>Error: {mapResults.error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.apiInfo}>
        <h3>Active Google APIs</h3>
        <div className={styles.apiList}>
          <div className={styles.apiItem}>
            <span className={styles.apiStatus}>✅</span>
            <span>Google Translate API</span>
            <span className={styles.apiEndpoint}>/api/google/translate</span>
          </div>
          <div className={styles.apiItem}>
            <span className={styles.apiStatus}>✅</span>
            <span>Google Maps API</span>
            <span className={styles.apiEndpoint}>/api/google/maps</span>
          </div>
          <div className={styles.apiItem}>
            <span className={styles.apiStatus}>✅</span>
            <span>Google Places API</span>
            <span className={styles.apiEndpoint}>/api/google/maps?type=places</span>
          </div>
          <div className={styles.apiItem}>
            <span className={styles.apiStatus}>✅</span>
            <span>Google Geocoding API</span>
            <span className={styles.apiEndpoint}>/api/google/maps?type=geocode</span>
          </div>
        </div>
      </div>
    </div>
  );
}
