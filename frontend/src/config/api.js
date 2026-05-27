import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/register`,
    LOGIN: `${API_BASE_URL}/api/login`,
  },
  TASKS: {
    BASE: `${API_BASE_URL}/api/tasks`,
    CREATE: `${API_BASE_URL}/api/tasks`,
    GET_ALL: `${API_BASE_URL}/api/tasks`,
    UPDATE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  }
};

export { apiClient };

// HTTP client configuration
export const createAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_ENDPOINTS;
