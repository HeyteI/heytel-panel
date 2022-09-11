import axios from 'axios';

const API_URL = 'https://api.heytel.local:8080'

export default axios.create({
    baseURL: API_URL,
});