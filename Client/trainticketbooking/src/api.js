import axios from 'axios';


const api = axios.create({
  baseURL: `https://train-ticket-booking-application.onrender.com/api`, 
});



api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
 
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
