interface User {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
}

interface CreateUser {
  email: string;
  password: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint: string, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const userApi = {
  getAll: (): Promise<User[]> => apiRequest('/users'),
  
  create: (userData: CreateUser): Promise<User> => 
    apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};