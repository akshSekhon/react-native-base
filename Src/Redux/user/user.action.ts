// import React, { FC, useContext, useEffect, useRef, useState } from 'react';
// import { NetInfo } from 'react-native'
import { Dispatch } from '@reduxjs/toolkit';
import { dispatchable } from '../dispatchable';
import { BaseReponse, CheckUserParams, SendOtpParams, LoginParams, LoginResponse, SendOTPParams, SignUpParams, SocialLoginParams, SumSubTokenRes, UserDetailEntity, VerifyOTPParams } from './user.entity';
import { actions } from './user.slice';
// import { instance } from '../../api/instance';
import { navigateAndReset } from '../../Navigations/NavigationService';
import * as Api from '../../Services/Networking';
import {
    getRefreshToken,
    getToken,
    removeTokens,
    saveTokenToStorage,
} from '../../Utils/token-storage';
import socket from '../../Services/Networking/SocketHandler/socket';
import { store } from '..';
import { showToastMessage } from '../../Utils';

// -- MARK: --Send Otp for login
// export const apiReqLogin = async (prarams: SendOTPParams) => {

//     try {
//         await removeTokens()
//         const result = await Api.apiRequest<any>('POST', Api.authUrl.login, prarams);
//         if (result.success) {
//             return result
//         } else {
//             return result
//         }

//     } catch (error: any) {
//         console.log('eroorr apiReqLogin :--[', JSON.stringify(error));
//         return {
//             data: null,
//             success: false,
//             error: error || 'An unexpected error occurred',
//         };
//     }
// }

export const apiReqLogin = dispatchable((prarams: LoginParams) => {
    return async (dispatch: Dispatch) => {
        try {
            // await removeTokens()

            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.login, prarams)
            const { status, data } = result;
            console.log("apiReqLogin result  --", result);
            if (result.success) {

                const header = { Authorization: `Bearer ${data?.access_token ?? ''}` }

                const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me, undefined, header)
                console.log("getUserDetail getUserDetail result  --", getUserDetail);

                await saveTokenToStorage({
                    token: data?.access_token ?? '',
                    // refreshToken: data?.refreshToken ?? '',
                });
                if (getUserDetail.success) {
                    dispatch(actions['user/set-user'](getUserDetail?.data ?? null));
                }
                // return getUserDetail
                return {
                    data: getUserDetail.data,
                    success: getUserDetail.success,
                    error: getUserDetail.error,
                    message: getUserDetail.message
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: result?.data as LoginResponse,
                    success: result.success,
                    error: result.error,
                    message: result.message
                }
            }

        } catch (error: any) {
            console.log('error from verify otp is :--', JSON.stringify(error));
            return {
                data: null,
                message: error?.message,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

export const apiReqSocialLogin = dispatchable((prarams: SocialLoginParams) => {
    return async (dispatch: Dispatch) => {
        try {
            // await removeTokens()

            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.social_login, prarams)
            const { status, data } = result;
            console.log("verify_otp result  --", result);
            if (result.success) {

                const header = { Authorization: `Bearer ${data?.access_token ?? ''}` }

                const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me, undefined, header)
                console.log("getUserDetail getUserDetail result  --", getUserDetail);

                await saveTokenToStorage({
                    token: data?.access_token ?? '',
                    // refreshToken: data?.refreshToken ?? '',
                });
                if (getUserDetail.success) {
                    dispatch(actions['user/set-user'](getUserDetail?.data ?? null));
                }
                // return getUserDetail
                return {
                    data: getUserDetail.data,
                    success: getUserDetail.success,
                    error: getUserDetail.error,
                    message: getUserDetail.message
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: result?.data as LoginResponse,
                    success: result.success,
                    error: result.error,
                    message: result.message
                }
            }

        } catch (error: any) {
            console.log('error from verify otp is :--', JSON.stringify(error));
            return {
                data: null,
                message: error?.message,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

export const apiReqRegister = dispatchable((prarams: SignUpParams) => {
    return async (dispatch: Dispatch) => {
        try {
            // await removeTokens()
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.register, prarams)
            const { status, data } = result;
            console.log("apiReqRegister register result  --", result);
            if (result.success) {

                const header = { Authorization: `Bearer ${data?.access_token ?? ''}` }

                const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me, undefined, header)
                console.log("apiReqRegister getUserDetail result  --", getUserDetail);

                await saveTokenToStorage({
                    token: data?.access_token ?? '',
                    // refreshToken: data?.refreshToken ?? '',
                });
                if (getUserDetail.success) {
                    dispatch(actions['user/set-user'](getUserDetail?.data ?? null));
                }
                // return getUserDetail
                return {
                    data: getUserDetail.data,
                    success: getUserDetail.success,
                    error: getUserDetail.error,
                    message: result.message
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: result?.data as LoginResponse,
                    success: result.success,
                    error: result.error,
                    message: result.message
                }
            }

        } catch (error: any) {
            console.log('error from apiReqRegister is :--', JSON.stringify(error));
            return {
                data: null,
                message: error?.message,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

// MARK:-- Verify Otp for login

export const apiRequestSendOtp = dispatchable((prarams: Omit<SendOtpParams, 'otp'>) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.send_otp, prarams)
            const { status, data } = result;
            console.log("apiRequestSendOtp result  --", result);
            if (result.success) {
                // return getUserDetail
                return {
                    data: result.data,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: null,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from verify otp is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});


// MARK:-- Check User Exist on platform

export const apiCheckUserExist = dispatchable((prarams: CheckUserParams) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<any>('POST', Api.authUrl.check_user_exist, prarams)
            const { status, data } = result;
            console.log("apiCheckUserExist result  --", result);
            if (result?.error) {
                showToastMessage(result?.error)
            }
            if (result.success) {
                // return getUserDetail
                return {
                    data: result.data,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: null,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from apiCheckUserExist is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});


export const apiRequestResetPassword = dispatchable((prarams: { newPassword: string, token: string }) => {

    // const accessatoken = `Bearer${token}`
    const header = { Authorization: `Bearer ${prarams?.token ?? ''}` }
    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.reset_password, { newPassword: prarams.newPassword }, header)
            const { status, data } = result;
            console.log("apiRequestResetPassword result  --", result);
            if (result.success) {
                // return getUserDetail
                return {
                    data: result.data,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: null,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from apiRequestResetPassword is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

export const apiRequestChangePassword = dispatchable((prarams: { oldPassword: string, newPassword: string }) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.change_password, prarams)
            const { status, data } = result;
            console.log("changePassword result  --", result);
            if (result.success) {
                // return getUserDetail
                return {
                    data: result.data,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: null,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from changePassword is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

export const apiRequestVerifyOtp = dispatchable((prarams: SendOtpParams) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.verify_otp, prarams)
            const { status, data } = result;
            console.log("verify_otp result  --", result);
            if (result.success) {
                // return getUserDetail
                return {
                    data: result.data,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: null,
                    success: result.success,
                    message: result?.message,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from verify otp is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});



// MARK:-- Verify Otp for login

export const apiVerifySignInOtp = dispatchable((prarams: VerifyOTPParams) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.verify_otp, prarams)
            const { status, data } = result;
            console.log("verify_otp result  --", result);
            if (result.success) {

                const header = { Authorization: `Bearer ${data?.access_token ?? ''}` }

                const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me, undefined, header)
                console.log("getUserDetail getUserDetail result  --", getUserDetail);

                await saveTokenToStorage({
                    token: data?.access_token ?? '',
                    // refreshToken: data?.refreshToken ?? '',
                });
                if (getUserDetail.success) {
                    dispatch(actions['user/set-user'](getUserDetail?.data ?? null));
                }
                // return getUserDetail
                return {
                    data: getUserDetail.data,
                    success: getUserDetail.success,
                    error: getUserDetail.error,
                }
            } else {
                // Alert.alert(result.message ?? '')
                return {
                    data: result?.data as LoginResponse,
                    success: result.success,
                    error: result.error,
                }
            }

        } catch (error: any) {
            console.log('error from verify otp is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});

// MARK:-- Sync User Profile Detail
export const snycUseProfileDetail = dispatchable(() => {
    return async (dispatch: Dispatch) => {
        try {

            const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me,)
            console.log("snycUseProfileDetail result  --", getUserDetail);

            if (getUserDetail.success) {
                dispatch(actions['user/set-user'](getUserDetail?.data ?? null));
            }
            // return getUserDetail
            return {
                data: getUserDetail.data,
                success: getUserDetail.success,
                error: getUserDetail.error,
            }


        } catch (error: any) {
            console.log('error from snycUseProfileDetail is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }
    };
});


// MARK:-- Update User Profile

export const apiReqUpdateProfile = dispatchable((prarams: FormData) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<UserDetailEntity>('POST', Api.clientUrl.update_profile, prarams);
            if (result.success) {
                dispatch(actions['user/set-user'](result?.data ?? null));
                return result
            } else {
                return result
            }

        } catch (error) {
            console.log('error apiReqUpdateProfile is :--', JSON.stringify(error));
            return {
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }

    }
}
)

export const apiReqGetSumsubToken = dispatchable(() => {

    return async () => {
        try {
            const result = await Api.apiRequest<SumSubTokenRes>('POST', Api.clientUrl.sumsub_access_token);
            // if (result.success) {
            //     // dispatch(actions['user/set-user'](result.data));
            //     return result
            // } else {

            console.log('apiReqGetSumsubToken result is :-- ', result);

            return result
            // }

        } catch (error) {
            console.log('error apiReqGetSumsubToken is :--', JSON.stringify(error));
            return {
                data: null,
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }

    }
}
)



export const apiReqUploadKyc = dispatchable((prarams: FormData) => {

    return async (dispatch: Dispatch) => {
        try {
            const result = await Api.apiRequest<BaseReponse>('POST', Api.clientUrl.upload_Kyc, prarams);
            console.log('result apiReqUploadKyc is :--', result);

            if (result.success) {
                await snycUseProfileDetail()

                // dispatch(actions['user/set-user'](profileDetail));
                return result
            } else {
                return result
            }

        } catch (error) {
            console.log('error apiReqUploadKyc is :--', JSON.stringify(error));
            return {
                success: false,
                error: error || 'An unexpected error occurred',
            };
        }

    }
}
)



//  MARK: -- Refresh Token When Token Expire 
export const refreshToken = dispatchable(() => {
    return async (dispatch: Dispatch) => {
        try {
            const tokenFromKeychain = await getToken();
            // const refreshTokenFromKeychain = await getRefreshToken();
            console.log('tokenFromKeychain :--', tokenFromKeychain);
            // console.log('refreshTokenFromKeychain :--', refreshTokenFromKeychain);

            if (!tokenFromKeychain) {
                return {
                    success: false,
                };
            }
            const header = { Authorization: `Bearer ${tokenFromKeychain ?? ''}` }
            const response = await Api.apiRequest<LoginResponse>('POST', Api.authUrl.refresh_token, {}, header)
            console.log('Api.authUrl refresh_token response :--', response);
            const { status, data } = response;
            if (status === 200 && !!data?.access_token) {
                const header = { Authorization: `Bearer ${data?.access_token ?? ''}` }
                const getUserDetail = await Api.apiRequest<UserDetailEntity>('GET', Api.clientUrl.me, {}, header)
                console.log('Api.authUrl  getUserDetail response :--', getUserDetail);

                await saveTokenToStorage({
                    token: data?.access_token ?? '',
                    // refreshToken: data?.refreshToken ?? '',
                });

                dispatch(actions['user/set-user'](getUserDetail?.data ?? data));
                return {
                    data: getUserDetail.data ?? data,
                    success: true,
                }
                // return getUserDetail
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.error || 'An unexpected error occurred',
            };
        }
    };
});


export const setFirebaseTokenIntoRedux = (data: string | null) => {
    // console.log('setOnlineUsersIntoRedux :---', data);
    store.dispatch(actions['user/set-firebaseToken'](data))
}
// MARK: -- User Logout 

export const deleteUserLoginData = dispatchable(() => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await removeTokens();
            if (result.success) {
                socket.disconnectSocket()
                // socket.removeListener()
                dispatch(actions['user/set-user'](null));
                navigateAndReset('Login')
                return {
                    success: true,
                };
            }
            console.log('user clean data ;-- ', result);

        } catch (error) {
            return {
                success: false,
            };
        }
    };
});

export const userLogout = dispatchable(() => {
    return async (dispatch: Dispatch) => {
        try {

            const res = await Api.apiRequest<any>('GET', Api.authUrl.logout,);
            if (res.success) {
                showToastMessage(res?.message)
                await deleteUserLoginData()
                console.log('user userLogout data ;-- ', res);
                return {
                    success: true,
                };
            }
            else {
                showToastMessage(res?.error)
            }
        } catch (error) {
            return {
                success: false,
            };
        }
    };
});
