import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return []
    }
);

export default apiClient;
