import axios from 'axios';

// http://35.78.193.134/

export const axios_instance = axios.create({
    baseURL: 'http://35.78.193.134/',
    headers: {
        "Content-Type": 'application/json',
    }
});

