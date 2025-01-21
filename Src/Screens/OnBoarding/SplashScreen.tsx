//import liraries
import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ImageHelper from '../../Assets/Gallery/ImageHelper';
import { scale, textScale } from '../../CommonStyles/responsiveSize';

// import { WrapperContainer } from '../../Components';
import { WrapperContainer } from '../../Components';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { getStyles } from '../../index';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { getStyles } from '../../CommonStyles';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useIsFocused } from '@react-navigation/native';
import { fontFamily } from '../../Assets/Fonts/FontFamily';
import AppLogo from '../../Components/AppLogo';
import { pushTo } from '../../Navigations/NavigationService';

// create a component
interface SplashScreen {
}
const SplashScreen = () => {
    const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext);
    const isFocused = useIsFocused()
    // useEffect(() => {
    //     SystemNavigationBar.setNavigationColor(colors.themeBlue, 'light', 'navigation')
    //     return () => {
    //         SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    //     }
    // }, [isFocused]);

    useEffect(() => {
        setTimeout(() => {
            pushTo('Welcome')
        }, 1000);
    })

    // const handleToken = async () => {
    //     await checkFirstLaunch()
    //     const result = await snycUseProfileDetail();
    //     console.log('Splash sresult?.data result?.data:---', result)
    //     if (isFalsy(result?.success)) {
    //         const onboarding = await getItem('onBoarding')
    //         if (isFalsy(onboarding)) {

    //             navigateAndReset('WelcomeScreen', { isLogedIn: false, onBoardingCompleted: false });
    //         } else {
    //             navigateAndReset('Login');
    //         }
    //         return;
    //     }
    //     if (result?.data) {
    //         navigateAndReset('TabNavigator')
    //     }
    // };
    // const checkFirstLaunch = async () => {
    //     try {
    //         const isAppAlreadyLaunched = await getItem('isAppAlreadyLaunched')
    //         if (isFalsy(isAppAlreadyLaunched)) {
    //             // Clear the Keychain/Keystore as it's a fresh install
    //             const tokenremove = await removeTokens()
    //             const setItemres = await setItem('isAppAlreadyLaunched', true)
    //             console.log('tokenremove :---', tokenremove);
    //             return setItemres
    //         } else {
    //             console.log(' isAppAlreadyLaunched',);
    //         }
    //     } catch (error) {
    //         console.log('checkFirstLaunch ERRR :-- ', error);
    //         return error
    //     }
    // };

    return (
        <WrapperContainer
            isBacgroundImage={false}
        >
            <View style={{ ...styles.container, backgroundColor: colors.themeBlue }}>
                <AppLogo />
            </View>
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
});

//make this component available to the app
export default SplashScreen;