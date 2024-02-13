import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.protocol + "//" + window.location.hostname + ':3000',
    timeout: 10000,
    withCredentials: true
});

instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
