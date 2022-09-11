import axios from 'axios';
import { Service } from 'axios-middleware';

const service = new Service(axios);
const API_URL = 'https://api.heytel.local:8080'

service.register({
    onRequest(config) {
        console.log('onRequest');
        return config;
    },
    onSync(promise) {
        console.log('onSync');
        return promise;
    },
    onResponse(response) {
        return response;
    },
    onResponseError(error) {
        const { response } = error
        if (response.status === 401) {
            window.location.href = '/login?forbidden=true'
        }
    }
});

export default axios.create({
    baseURL: API_URL,
});