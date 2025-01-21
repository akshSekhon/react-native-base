import axios from 'axios';
import * as Apis from '.';
import * as utils from '../../Utils';

import { deleteUserLoginData } from '../../Redux/user/user.action';
export const instance = axios.create({
    // baseURL: 'http://20.244.34.96:8000',
    baseURL: 'https://api.echoblock.online',
    headers: {
        'Content-Type': 'application/json',
        Authorization: ''
    },
    // httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Temporarily disable SSL verification

});

const refreshToken = async () => {
    const refreshTokenFromKeychain = await utils.getRefreshToken();

    if (!refreshTokenFromKeychain) {
        return null;
    }

    try {
        const response = await axios.post(Apis.getbaseUrl + Apis.authUrl.refresh_token, {}, { headers: { Authorization: refreshTokenFromKeychain } });
        console.log('response refreshing token :-- ', response?.data?.data?.token);
        await utils.saveTokenToStorage({
            token: response?.data?.data?.token ?? '',
            // refreshToken: response?.data?.data?.refreshToken ?? '',
        });

        return response?.data?.data?.token;
    } catch (error: any) {
        console.log('error while refreshing token :-- ', JSON.stringify(error));
        if (error?.status == 401) {
            await deleteUserLoginData()
        }

        console.log(error?.response?.data);
        throw error;
    }
};

instance.interceptors.request.use(async config => {
    const token = await utils.getToken()
    console.log("config config :--", config);

    if (token) {
        if (!!config?.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

instance.interceptors.response.use(
    response => response,
    async error => {
        // const originalRequest = error?.config;

        // console.log('error interceptors :---', error);
        console.log("Error interceptors : ", JSON.stringify(error));

        // MARK: -Disable refresh token

        // if (error?.response && error?.response?.status === 401 && !originalRequest?._retry) {
        //     originalRequest._retry = true;

        //     try {
        //         const newToken = await refreshToken();
        //         if (newToken) {
        //             // instance.defaults.headers.common.Authorization = `${newToken}`;
        //             originalRequest.headers.Authorization = `${newToken}`;
        //             return instance(originalRequest); // Retry the original request
        //         }
        //     } catch (refreshError) {
        //         console.log("Error during token refresh: ", refreshError);
        //         return Promise.reject(refreshError);
        //     }
        // } else {
        //     console.log('Non-401 error occurred');
        // }
        if (error?.status == 401) {
            // await userLogout()
            await deleteUserLoginData()
        }
        return Promise.reject(error);
    },
);


