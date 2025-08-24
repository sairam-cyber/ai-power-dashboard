// Google API Integration
export const GOOGLE_API_KEY = 'AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY';

// Google Services Configuration
export const GOOGLE_SERVICES = {
  MAPS: 'https://maps.googleapis.com/maps/api',
  PLACES: 'https://maps.googleapis.com/maps/api/place',
  GEOCODING: 'https://maps.googleapis.com/maps/api/geocode',
  TRANSLATE: 'https://translation.googleapis.com/language/translate/v2',
  VISION: 'https://vision.googleapis.com/v1',
  SPEECH: 'https://speech.googleapis.com/v1',
};

// Helper functions for Google API calls
export const getGoogleApiKey = () => GOOGLE_API_KEY;

export const buildGoogleApiUrl = (service: string, endpoint: string, params: Record<string, string> = {}) => {
  const url = new URL(`${service}/${endpoint}`);
  url.searchParams.append('key', GOOGLE_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
};

// Example API call functions
export const googleMapsApi = {
  geocode: async (address: string) => {
    const url = buildGoogleApiUrl(GOOGLE_SERVICES.GEOCODING, 'json', { address });
    const response = await fetch(url);
    return response.json();
  },
  
  places: async (query: string) => {
    const url = buildGoogleApiUrl(GOOGLE_SERVICES.PLACES, 'textsearch/json', { query });
    const response = await fetch(url);
    return response.json();
  }
};

export const googleTranslateApi = {
  translate: async (text: string, targetLanguage: string = 'en') => {
    const url = `${GOOGLE_SERVICES.TRANSLATE}?key=${GOOGLE_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: 'text'
      })
    });
    return response.json();
  }
};
