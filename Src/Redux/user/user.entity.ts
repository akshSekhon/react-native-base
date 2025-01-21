
export interface UserDetailEntity {
  id: string;
  name: string | null;
  profile_image: string | null;
  country_code: string | null;
  phone_code: string | null;
  phone_number: string | null;
  email: string | null;
  status: string | null;
  sumsub_verification_status: KycStatus | undefined;
  public_hash: string | null;
  is_email_verified: boolean | null
  is_phone_number_verified: boolean | null
  sumsub_applicant_id: string | null
  sumsub_inspection_id: string | null
  facebook_id: string | null
  google_id: string | null
  walletBalance: number | null
}


export interface LoginResponse {
  id: string;
  name: string|null;
  email: string | null;
  phone_number: string | null;
  phone_code: string | null;
  country_code: string | null;
  profile_image: string | null;
  sumsub_verification_status: KycStatus | null;
  access_token: string | null;
  public_hash: string | null;


  // otp: string|string;
  // createdAt: Date;
  // updatedAt: Date;
  // token: string;
  // refreshToken: string;
  // kycInfo?:kycInfo | undefined
}
export interface kycInfo {
  _id?: string;
  createdAt?: Date;
  document_back?: string;
  document_front?: string;
  document_type?: string;
  reason?: null;
  status?: KycStatus;
  updatedAt?: Date;
  userId?: string;
}
export interface SumSubTokenRes {
  token?: string;
  userId?: string;
}

export type KycStatus = 'pending' | 'submitted' | 'completed' | 'rejected' | undefined

export interface LoginParams {
  // phone_number?: string;
  email: string;
  // country_code?: string;
  // phone_code?: string
  password?: string,
  deviceToken:string,

}
export interface SocialLoginParams {
  email: string;
  name: string;
  google_id?: string;
  facebook_id?: string;
  deviceToken?:string

}
export interface SignUpParams {
  name: string;
  country_code: string;
  phone_code: string
  phone_number: string;
  email: string;
  password?: string
  deviceToken?:string

}
export interface SendOTPParams {
  phone_number: string;
  country_code: string;
  phone_code: string

}

export interface VerifyOTPParams {
  otp: string;
  device_token: string;
  phone_number: string;
  phone_code: string;
}

export type OTP_VerifyAction = 'forgot' | 'signup' | 'profile'

export interface SendOtpParams {
  type: "phone" | "email"
  otp?: string;
  email?: string;
  phone_number?: string;
  phone_code?: string,
  action?: OTP_VerifyAction
  deviceToken?:string
}

export interface CheckUserParams {
  email?: string;
  phone_number?: string;
  phone_code?: string,
}

export interface CreateProfileParams {
  name?: string;
  email?: string;
  phone_number?: string;
  phone_code?: string,
  country_code?: string,
  profile_image?: string;
  public_hash?: string;
}


export interface SendOTPRespons {
  data: string,
  error: string,
  message: string,
  // status: number
}

export interface BaseReponse {
  error: string | ''
  message: string | ''
  data: any | null
  status: number
}


export interface UserProfileResponse extends BaseReponse {
  data: UserDetailEntity
}
export interface UserState {
  user: UserDetailEntity | null | undefined;
  firebaseToken: string | null | undefined;
}

// export type UserActivityStatus = InChatActivityType 'typing' | 'online' | undefined
export interface UserStatus {
  activityStatus?: any
  isOnline?: boolean
  lastSeen?: string|Date
  isTyping?: boolean
}