// Base URL of the backend API
const API_BASE_URL = 'http://localhost:5000/api'; // Change the port if your backend runs on a different one

// All API endpoint configurations
const config = {
  API_BASE_URL,
  AGENTS_API: `${API_BASE_URL}/agents`,
  BOOKINGS_API: `${API_BASE_URL}/bookings`,
  CUSTOMERS_API: `${API_BASE_URL}/customers`,
  FEEDBACK_API: `${API_BASE_URL}/feedback`,
  HOTELS_API: `${API_BASE_URL}/hotels`,
  PAYMENTS_API: `${API_BASE_URL}/payments`,
  PLACES_API: `${API_BASE_URL}/places`,
};

export default config;
