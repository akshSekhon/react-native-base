import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStyles } from '../../CommonStyles/index.tsx';
import { ThemeContext } from '../../Providers/ThemeProvider';
import { BrandRouteParamList, RouteParamList } from '../routes.type';
import BrandTabNavigator from '../BrandTabNavigator.tsx';
const BrndStack = createNativeStackNavigator<BrandRouteParamList>();

export const BrandStack = () => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    return (
        <BrndStack.Navigator
            initialRouteName={'BrandTabNavigator'}
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.appBg,
                // navigationBarHidden: true,
                animationTypeForReplace: 'push'
            }}

        >
            <BrndStack.Screen
                key={'BrandTabNavigator'} // Use name as the key
                name={'BrandTabNavigator'} // Use name for the route name
                component={BrandTabNavigator} // Use the component
            />


            {/* <Stack.Screen
                key={'BrandDetail'} // Use name as the key
                name={'BrandDetail'} // Use name for the route name
                component={BrandDetail} // Use the component
            />
            */}
        </BrndStack.Navigator>
    )
}