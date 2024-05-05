import axios from "axios";
import {BASE_URL} from "../utils/consts";
import jwt_decode from "jwt-decode";

const $host = axios.create({
    baseURL: 'http://localhost:8080/user'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:8080/user'
})

const authInterceptor = config =>{
    config.headers.authorization = 'Bearer ' +localStorage.getItem('token')
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
export const check = async () => {
    try {
        const { data } = await $authHost.get('');
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    } catch (error) {
        console.error('Error in check:', error);
        throw error; // Rethrow the error to handle it higher up in the call stack
    }
};
