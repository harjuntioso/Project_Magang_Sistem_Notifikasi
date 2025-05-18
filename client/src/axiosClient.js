import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update with your Laravel URL
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const checkWhatsAppStatus = () => api.get('/whatsapp/status');
export const sendWhatsAppMessage = (number, message) => api.post('/whatsapp/send', { number, message });

export default api;