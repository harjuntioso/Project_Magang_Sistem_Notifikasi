import axios from 'axios';

const API_BASE_URL = process.env.REACT_API_BASE_URL || 'http://server.test/api';
const CSRF_URL = 'http://server.test/sanctum/csrf-cookie';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
});

// Interceptor request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ⛔ Deteksi jika request adalah ke sanctum/csrf-cookie, override baseURL
  if (config.url === '/sanctum/csrf-cookie') {
    config.baseURL = ''; // Hilangkan baseURL agar full URL dipakai
    config.url = CSRF_URL;
  }

  console.log('--- Axios Request Debug ---');
  console.log('URL:', config.baseURL + config.url);
  console.log('Method:', config.method);
  console.log('Headers:', config.headers);
  console.log('Data:', config.data);
  console.log('-------------------------');
  return config;
}, (error) => {
  console.error('Axios Request Error:', error);
  return Promise.reject(error);
});

// Interceptor response
axiosClient.interceptors.response.use((response) => {
  console.log('--- Axios Response Debug ---');
  console.log('URL:', response.config.url);
  console.log('Status:', response.status);
  console.log('Headers:', response.headers);
  console.log('Data:', response.data);
  console.log('--------------------------');
  return response;
}, (error) => {
  console.error('--- Axios Response Error Debug ---');
  if (error.response) {
    console.error('Error Status:', error.response.status);
    console.error('Error Data:', error.response.data);
    console.error('Error Headers:', error.response.headers);
    if (error.response.status === 419) {
      console.error('!!! KESALAHAN 419 CSRF TOKEN MISMATCH DITEMUKAN !!!');
      console.error('Periksa: SESSION_DOMAIN di .env Laravel, sanctum/csrf-cookie diakses, withCredentials: true');
    }
  } else if (error.request) {
    console.error('No response received from server:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  console.error('--------------------------------');

  const { response } = error;
  if (response) {
    switch (response.status) {
      case 401:
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/login';
        break;
      case 403:
        console.error('Akses ditolak (403): Anda tidak memiliki izin untuk melakukan aksi ini.');
        break;
      case 404:
        console.warn('Resource tidak ditemukan (404): URL API mungkin salah atau data tidak ada.');
        break;
      case 422:
        console.error('Validasi data gagal (422):', response.data.errors);
        break;
      case 500:
        console.error('Terjadi kesalahan server (500):', response.data.message);
        break;
      default:
        console.error(`Error ${response.status}:`, response.data);
    }
  } else {
    console.error('Tidak ada respons dari server atau masalah jaringan:', error.message);
  }

  return Promise.reject(error);
});

// Fungsi API
export const getCsrfCookie = () => axiosClient.get('/sanctum/csrf-cookie'); // tetap gunakan relative
export const checkWhatsAppStatus = () => axiosClient.get('/whatsapp/status');
export const sendWhatsAppMessage = (number, message) => axiosClient.post('/whatsapp/send', { number, message });
export const getDashboardStats = () => axiosClient.get('/dashboard/stats');
export const getRecentActivities = () => axiosClient.get('/dashboard/activities');

export default axiosClient;
