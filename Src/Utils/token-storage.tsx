import * as Keychain from 'react-native-keychain';

//MARK: -- Get Access tokens from KeyChain

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) {
    return null;
  }
  return credentials.password;  
};

//MARK: -- Get Refresh tokens from KeyChain

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: 'refreshToken',
  });
  if (!credentials) {
    return null;
  }
  return credentials.password;
};
//MARK: -- Save tokens to KeyChain

export const saveTokenToStorage = async ({
  token,
  // refreshToken,
}: {
  token: string;
  // refreshToken: string;
}) => {
  await Keychain.setGenericPassword('token', token,{accessible:Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY});
  // await Keychain.setGenericPassword('refreshToken', refreshToken, {
  //   service: 'refreshToken',
  // });
};
//MARK: -- Remove tokens from KeyChain
export const removeTokens = async () => {
  try {
    await Keychain.resetGenericPassword();
    // await Keychain.resetGenericPassword({service: 'refreshToken'});
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
