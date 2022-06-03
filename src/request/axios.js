import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});

instance.interceptors.request.use(config => {
    config.headers['Accept'] ='application/json'
    config.headers['Content-type'] ='application/json;charset=UTF-8'

    return config;
}, error => {
    Promise.reject(error);
});

export default instance;
