import axios, { AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  Asset, 
  AssetCategory, 
  AssetStatus, 
  PaginatedResponse,
  CreateAssetRequest,
  UpdateAssetRequest
} from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.url && !config.url.includes('/auth/')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log the request for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    if (config.headers.Authorization) {
      console.log('Authorization header present');
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing auth data');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<AuthResponse>> => {
    console.log('Attempting login for user:', credentials.username);
    return api.post('/auth/login', credentials);
  },
  
  register: (userData: RegisterRequest): Promise<AxiosResponse<AuthResponse>> => {
    console.log('Attempting registration for user:', userData.username);
    return api.post('/auth/register', userData);
  },
};

export const assetsApi = {
  getAssets: (page = 0, size = 10): Promise<AxiosResponse<PaginatedResponse<Asset>>> => {
    console.log(`Fetching assets: page=${page}, size=${size}`);
    return api.get(`/assets?page=${page}&size=${size}`);
  },
  
  createAsset: (asset: CreateAssetRequest): Promise<AxiosResponse<Asset>> => {
    console.log('Creating asset:', asset.assetName);
    return api.post('/assets', asset);
  },
  
  updateAsset: (asset: UpdateAssetRequest): Promise<AxiosResponse<Asset>> => {
    console.log('Updating asset:', asset.id);
    return api.put(`/assets/${asset.id}`, asset);
  },
  
  deleteAsset: (id: number): Promise<AxiosResponse<void>> => {
    console.log('Deleting asset:', id);
    return api.delete(`/assets/${id}`);
  },
};

export const masterDataApi = {
  getCategories: (): Promise<AxiosResponse<AssetCategory[]>> => {
    console.log('Fetching categories...');
    return api.get('/categories');
  },
  
  getStatuses: (): Promise<AxiosResponse<AssetStatus[]>> => {
    console.log('Fetching statuses...');
    return api.get('/statuses');
  },
};

// Test connectivity
export const testApi = {
  test: (): Promise<AxiosResponse<any>> => {
    console.log('Testing API connectivity...');
    return api.get('/test');
  },
};

export default api;