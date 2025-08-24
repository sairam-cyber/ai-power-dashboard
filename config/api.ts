// API Configuration
export const API_CONFIG = {
  GOOGLE_API_KEY: 'AIzaSyBW0LW4hmHjEp2a0_Eg0StV1Gh5QhHgDXY',
  // Add other API configurations here as needed
};

// Google API endpoints and services
export const GOOGLE_SERVICES = {
  MAPS: 'https://maps.googleapis.com/maps/api',
  PLACES: 'https://maps.googleapis.com/maps/api/place',
  GEOCODING: 'https://maps.googleapis.com/maps/api/geocode',
  // Add more Google services as needed
};

// Helper function to get API key
export const getGoogleApiKey = () => {
  return API_CONFIG.GOOGLE_API_KEY;
};
