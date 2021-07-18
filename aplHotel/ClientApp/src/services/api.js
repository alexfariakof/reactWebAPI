import axios from 'axios';

const api = newFunction()

export default api;

function newFunction() {
    return axios.create({
        baseUrl: 'https://localhost:44365/',
    });
}
