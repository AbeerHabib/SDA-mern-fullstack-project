import axios from 'axios';

let baseURL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL
});

export const imageURL = 'http://localhost:8080/';

api.defaults.withCredentials = true;

export default api;