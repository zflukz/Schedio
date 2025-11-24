export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const apiEndpoints = {
  profile: `${API_BASE_URL}/api/profile`,
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  oauth2Google: `${API_BASE_URL}/oauth2/authorization/google`,
};