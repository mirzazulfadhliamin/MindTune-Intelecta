import axios from 'axios';

// Membuat instance axios dengan interceptor untuk menangani refresh token
const api = axios.create();

// Interceptor untuk menangani response error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Jika error 403 (Forbidden) dan belum pernah mencoba refresh token
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refresh_token = localStorage.getItem('refresh_token');
        
        if (!refresh_token) {
          // Jika tidak ada refresh token, logout
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('isLogin');
          return Promise.reject(error);
        }
        
        // Refresh token
        const response = await axios.post(
          `https://mindtune-api.syahranfd.cloud/api/users/refresh-token?refresh_token=${refresh_token}`
        );
        
        const { access_token, refresh_token: new_refresh_token } = response.data;
        
        // Update token di localStorage
        localStorage.setItem('access_token', access_token);
        if (new_refresh_token) {
          localStorage.setItem('refresh_token', new_refresh_token);
        }
        
        // Update header Authorization di request original
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        
        // Retry request original
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        
        // Jika refresh token gagal, logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isLogin');
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useAuth = () => {
  // Fungsi untuk memeriksa apakah user sudah login
  const isAuthenticated = () => {
    return localStorage.getItem('isLogin') === 'true';
  };
  
  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('isLogin');
  };
  
  // Fungsi untuk mendapatkan login URL
  const getLoginUrl = async () => {
    try {
      const response = await axios.get('https://mindtune-api.syahranfd.cloud/api/users/login');
      return response.data.auth_url;
    } catch (error) {
      console.error('Error getting login URL:', error);
      throw error;
    }
  };
  
  // Fungsi untuk exchange code dengan token
  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.get(`https://mindtune-api.syahranfd.cloud/api/users/access-token?code=${code}`);
      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('isLogin', 'true');
      
      return { access_token, refresh_token };
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };
  
  return {
    api,
    isAuthenticated,
    logout,
    getLoginUrl,
    exchangeCodeForToken
  };
};

export default useAuth;