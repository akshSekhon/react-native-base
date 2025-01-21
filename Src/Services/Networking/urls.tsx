// import Config from 'react-native-config';

// const  { BASE_URL_DEV, BASE_URL_PROD, API_MIDPT_USER_URL } = Config

import { BASE_URL_DEV, BASE_URL_PROD } from "@env"

export type APPEnvironment = 'DEV' | 'PROD'

export const getbaseUrl = 'http://20.244.34.96:8000'
export const BaseUrl_Socket_NODE = 'http://20.244.34.96:8000'
export const BaseUrl_Socket_AI = 'http://20.244.34.96:8000'

const getAuthUrl = (endpoint?: string) => `/api/user/` + endpoint ?? ''
const getClientUrl = (endpoint?: string) => `/api/user/` + endpoint ?? ''

export const authUrl = {
    login: getAuthUrl('login'),
    social_login: getAuthUrl('social-login'),
    register: getAuthUrl('register'),
    refresh_token: getAuthUrl('refresh_token'),
    send_otp: getAuthUrl('send-otp'),
    verify_otp: getAuthUrl('verify-otp'),
    reset_password: getAuthUrl('reset-password'),
    change_password: getAuthUrl('change-password'),
    check_user_exist: getAuthUrl('check-user-existance'),
    logout: getAuthUrl('logout'),

    //Home
    home: getAuthUrl('home'),
    pots: getAuthUrl('pots'),
    getAllRransactions: getAuthUrl('gettransactions'),
    myorders: getAuthUrl('myorders'),
    potTransactions: getAuthUrl('transactions'),
    buyTickets: getAuthUrl('buy-tickets'),
    depositFunds: getAuthUrl('depositFunds'),
    withdrawFunds: getAuthUrl('withdrawFunds'),
}
export const clientUrl = {
    me: getClientUrl('profile'),
    update_profile: getClientUrl('profile/update'),
    sumsub_access_token: getClientUrl('sumsub-access-token'),

    upload_Kyc: getClientUrl('upload/kyc'),
    chat_history: getClientUrl('chat/history'),
    active_Chat_listing: getClientUrl('chat/user/listing'),
}
