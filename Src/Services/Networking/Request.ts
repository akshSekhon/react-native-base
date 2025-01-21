import NetInfo from "@react-native-community/netinfo";
import { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { instance } from ".";
import { getToken, isFalsy, showToastMessage } from "../../Utils";
const formatAxiosResponse = <T>(res: AxiosResponse, success: boolean) => {
    return {
        data: res.data.data as T,
        status: res?.status as number,
        error: res?.data?.error as string,
        message: res?.data?.message as string,
        success: success
    }
}
export async function apiRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    bodyData?: any,
    additionalHeaders?: Record<string, string>,
    // isMutipart?: 'json'|'mutipart'
): Promise<{ status?: number, success: boolean; data?: T; error?: string, message?: string }> {
    let extraHeaderOptions = {
        "Content-Type": bodyData instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...additionalHeaders
    };
    try {
        const networkState = await NetInfo.fetch();

        if (!networkState.isConnected) {

            showToastMessage('No network connection')
            return {
                success: false,
                error: 'No network connection',
            };
        }
        const token = await getToken()
        console.log('getToken token:--', token);

        const headers: RawAxiosRequestHeaders = {
            ...instance.defaults.headers.common,
            ...(token ? { Authorization: `Bearer ${token ?? ''}` } : {}),
            ...extraHeaderOptions,
        };
        const data = isFalsy(bodyData) ? undefined : bodyData
        // Create the config object
        const config: AxiosRequestConfig = {
            method,
            url,
            headers,
            data,
            // timeout: 10000, // Optional: Set timeout for request
        };

        const response: AxiosResponse<T> = await instance(config);
        console.log('response from common req :-- ', response.data);
        if (response.status >= 200 && response.status < 300) {
            return formatAxiosResponse(response, true)
        } else {
            return formatAxiosResponse(response, false)
        }

    } catch (error: any) {

        const errrrr = error?.response?.data?.error
            ? error?.response?.data?.error
            : error?.response?.data?.message
                ? error?.response?.data?.message
                : error?.message
                    ? error?.message
                    : "Something went wrong!"
        // Toast.show(errrrr, 20)
        console.log('errrr:--- ', errrrr);

        return {
            error: errrrr,
            success: false,
            message: errrrr,
            // error: error.message || 'An unexpected error occurred',
        };
    }
}


// const resposError 


export async function uploadFile<T>(
    url: string,
    formData: any,  // File URI in React Native
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        const networkState = await NetInfo.fetch();

        if (!networkState.isConnected) {
            return {
                success: false,
                error: 'No network connection',
            };
        }
        const formData = new FormData();
        const config: AxiosRequestConfig = {
            method: 'POST',
            url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: onProgress, // Track upload progress here
        };

        const response: AxiosResponse<T> = await instance(config);

        return {
            success: true,
            data: response.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
}