// import {
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import {
  LoginManager,
  AccessToken,
  AuthenticationToken,
} from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";
import { appleAuth } from "@invertase/react-native-apple-authentication";
// import auth from "@react-native-firebase/auth";

export async function fbLogin() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    "email",
    "public_profile",
  ]);
  console.log(result, "Result");
  if (Platform.OS === "ios") {
    const result = await AuthenticationToken.getAuthenticationTokenIOS();
    return result;
  } else {
    const result = await AccessToken.getCurrentAccessToken();
    return result;
  }
}

export async function googleLogin() {
  // Check if your device supports Google Play
  const hasPreviousSignIn =  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // const hasPreviousSignIn =  GoogleSignin.hasPreviousSignIn();
  console.log('googleLogin hasPreviousSignIn :-- ', hasPreviousSignIn);

  // Get the users ID token
  const res = await GoogleSignin.signIn();
  console.log('googleLogin idToken :-- ', res);

  // if (!idToken) {
  //   return
  // }
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(res.data.idToken);
  console.log('googleLogin googleCredential :-- ', googleCredential);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export async function onAppleLogin() {
  // Start the sign-in request
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.IMPLICIT,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log("appleAuthRequestResponse : ---", appleAuthRequestResponse);
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce, email } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );
    console.log("appleCredential : ---", appleCredential);

    // Sign the user in with the credential
    return { appleCredential, appleAuthRequestResponse };
  } catch (error) {
    console.log("onAppleLogin eroor :--", error);
  }
}

export async function revokeSignInWithAppleToken() {
  // Get an authorizationCode from Apple
  const { authorizationCode } = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.REFRESH,
  });

  // Ensure Apple returned an authorizationCode
  if (!authorizationCode) {
    throw new Error("Apple Revocation failed - no authorizationCode returned");
  }

  // Revoke the token
  return auth().revokeToken(authorizationCode);
}
