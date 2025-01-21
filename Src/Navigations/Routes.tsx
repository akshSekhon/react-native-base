//import liraries
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { navigationRef } from './NavigationService';
import { RouteParamList } from './routes.type.ts';
import { Modules } from '../index.tsx'
import Welcome from '../Screens/Authentication/Welcome.tsx';
import SplashScreen from '../Screens/OnBoarding/SplashScreen.tsx';
import TabNavigator from './TabNavigator.tsx';

const Stack = createNativeStackNavigator<RouteParamList>();
// create a component
interface props {
}

// Create screenArray
// const scrArray: ScreenItem[] = Object.entries(screens).map(([name, component]) => ({
//     name: name as ScreenNames, // Ensure type matches ScreenNames
//     component: component as React.ComponentType<any> // Ensure type matches a React component
// }));

const Routes: FC<props> = () => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    const theme: Theme = {
        dark: true,
        colors: {
            background: colors.appBg,
        }

    }
    // SystemNavigationBar.fullScreen()
    return (
        <NavigationContainer
            // theme={theme}
            ref={navigationRef}
        >
            <Stack.Navigator
                initialRouteName={'SplashScreen'}
                screenOptions={{
                    headerShown: false,
                    navigationBarColor: colors.appBg,

                    // navigationBarHidden: true,
                    animationTypeForReplace: 'push'
                }}>
                <Stack.Screen
                    key={'SplashScreen'} // Use name as the key
                    name={'SplashScreen'} // Use name for the route name
                    component={SplashScreen} // Use the component
                />
                <Stack.Screen
                    key={'Welcome'} // Use name as the key
                    name={'Welcome'} // Use name for the route name
                    component={Welcome} // Use the component
                />
                <Stack.Screen
                    key={'Login'} // Use name as the key
                    name={'Login'} // Use name for the route name
                    component={Modules.Auth.Login} // Use the component
                />
                <Stack.Screen
                    key={'SignUp'} // Use name as the key
                    name={'SignUp'} // Use name for the route name
                    component={Modules.Auth.SignUp} // Use the component
                />
                <Stack.Screen
                    key={'AddSocialAccounts'} // Use name as the key
                    name={'AddSocialAccounts'} // Use name for the route name
                    component={Modules.Auth.AddSocialAccounts} // Use the component
                />
                <Stack.Screen
                    key={'TabNavigator'} // Use name as the key
                    name={'TabNavigator'} // Use name for the route name
                    component={TabNavigator} // Use the component
                />
            </Stack.Navigator>
        </NavigationContainer>

    )
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Routes;