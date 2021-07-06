import axios from 'axios';

export const baseURL = "https://peu.pythonanywhere.com/";

const api = axios.create({
    baseURL: baseURL
});

export default api;