import { createNativeStackNavigator } from '@react-navigation/native-stack';
import react from 'react'
import { AuthRouteParamList, RouteParamList } from '../routes.type';
// import { getStyles, Modules } from '../../index.tsx';
import { Welcome } from '../../Screens/Authentication';
import { SplashScreen } from '../../Screens';
import TabNavigator from '../BrandTabNavigator.tsx';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { getStyles } from '../../CommonStyles/index.tsx';
import { Modules } from '../../index.tsx';



const Stack = createNativeStackNavigator<AuthRouteParamList>();


export const AuthStack = () => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)

    return (
        <Stack.Navigator
            initialRouteName={'Welcome'}
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.appBg,
                // navigationBarHidden: true,
                animationTypeForReplace: 'push'
            }}>
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

        </Stack.Navigator>
    )

}