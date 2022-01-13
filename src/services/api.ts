import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.100:3333',
  withCredentials: true,
})

export default api;