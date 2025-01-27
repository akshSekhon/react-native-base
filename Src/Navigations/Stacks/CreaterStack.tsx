import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStyles } from '../../CommonStyles/index.tsx';
import { CreaterRouteParamList } from '../routes.type';

import { ThemeContext } from '../../Providers/ThemeProvider';
import CreaterTabNavigator from '../CreaterTabNavigator.tsx';
import { Modules } from '../../index.tsx';



const CraterStack = createNativeStackNavigator<CreaterRouteParamList>();


export const CreaterStack = () => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    return (
        <CraterStack.Navigator
            initialRouteName={'CreaterTabNavigator'}
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.appBg,
                // navigationBarHidden: true,
                animationTypeForReplace: 'push'
            }}>
            <CraterStack.Screen
                key={'CreaterTabNavigator'} // Use name as the key
                name={'CreaterTabNavigator'} // Use name for the route name
                component={CreaterTabNavigator} // Use the component
            />

            <CraterStack.Screen
                key={'BrandDetail'} // Use name as the key
                name={'BrandDetail'} // Use name for the route name
                component={Modules.Creater.BrandDetail} // Use the component
            />
        </CraterStack.Navigator>
    )

}