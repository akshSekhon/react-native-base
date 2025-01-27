//import liraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import SplashScreen from '../Screens/OnBoarding/SplashScreen.tsx';
import { RouteStackParams } from './routes.type.ts';
import { BrandStack } from './Stacks/BrandStack.tsx';
import { CreaterStack } from './Stacks/CreaterStack.tsx';
import { AuthStack } from './Stacks/AuthStack.tsx';
import { getStyles, useStyles } from '../CommonStyles/index.tsx';
import { ThemeContext } from '../Providers/ThemeProvider.tsx';

const MasterStack = createNativeStackNavigator<RouteStackParams>();
// create a component
interface props {
}
const Routes: FC<props> = () => {
    const { colors, comnViewStyles, textStyles } = useStyles()

    return (
        <MasterStack.Navigator
            initialRouteName={'createrStack'}
            screenOptions={{
                headerShown: false,
                navigationBarColor: colors.appBg,

                // navigationBarHidden: true,
                animationTypeForReplace: 'push'
            }}
        >
            <MasterStack.Screen key={'SplashScreen'} name={'SplashScreen'} component={SplashScreen} />
            <MasterStack.Screen key={'authStack'} name={'authStack'} component={AuthStack} />
            <MasterStack.Screen key={'brandStack'} name={'brandStack'} component={BrandStack} />
            <MasterStack.Screen key={'createrStack'} name={'createrStack'} component={CreaterStack} />
        </MasterStack.Navigator>
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