import axios from 'axios';

export const baseURL = "http://peu.pythonanywhere.com/";

const api = axios.create({
    baseURL: baseURL
});

export default api;