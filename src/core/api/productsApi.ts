import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage.adapter';
import axios from 'axios';
import { Platform } from 'react-native';


//TODO conectar mediante envs vars, Android e IOS
const STAGE = process.env.EXPO_PUBLIC_STAGE || 'dev';

export const API_URL =
    (STAGE === 'prod') ? process.env.EXPO_PUBLIC_API_URL : (Platform.OS === 'ios')
        ? process.env.EXPO_PUBLIC_API_URL_IOS : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log({ STAGE, [Platform.OS]: API_URL });

const productsApi = axios.create({
    // baseURL: `localhost:3000/api`
    baseURL: API_URL
})

//TODO Interceptores
productsApi.interceptors.request.use(async (config) => {
    //Verificar si tenemos un token en el Secure Storage
    const token = await SecureStorageAdapter.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export { productsApi };

