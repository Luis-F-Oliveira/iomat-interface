import axios from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})