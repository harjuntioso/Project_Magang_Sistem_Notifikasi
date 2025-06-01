import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your Laravel URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if(token){
  config.headers.Authorization = `Bearer ${token}`
  }return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }
  throw error;
})


export const checkWhatsAppStatus = () => axiosClient.get('/whatsapp/status');

export const sendWhatsAppMessage = (number, message) => axiosClient.post('/whatsapp/send', { number, message });

export const getDashboardStats = () => axiosClient.get('/dashboard/stats');

export const getRecentActivities = () => axiosClient.get('/dashboard/activities');

export default axiosClient;