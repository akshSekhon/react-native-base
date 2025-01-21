//import liraries
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
// import TabBarComponent from '../Components/TabBarComponent';
import { useIsFocused } from '@react-navigation/native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { getStyles } from '../CommonStyles';
import { scale } from '../CommonStyles/responsiveSize';
// import TabBarComponent from '../Components/Tabbar/TabBarComponent';
import { ThemeContext } from '../Providers/ThemeProvider.tsx';
import { TabBarRouteList } from './routes.type';
import { Modules } from '../index.tsx';
import ImageHelper from '../Assets/Gallery/ImageHelper.tsx';
import TabBarComponent from '../Components/Tabbar/TabBarComponent.tsx';
import { View } from 'react-native';

// import TabBarComponent from '../../Components/TabBarComponent';



const Tab = createBottomTabNavigator<TabBarRouteList>();
// create a component
const TabNavigator = () => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    const activeRoute = Modules.CreaterRoute
    return (
        //TabBarComponent {...props}
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                // tabBarVariant: 'material',
                // tabBarPosition: 'left',
                // tabBarBackground: () => <View style={{ backgroundColor: 'red', height: 80 }} />
            }}
            tabBar={(props: BottomTabBarProps) => <TabBarComponent {...props} />}
        >
            <Tab.Screen
                options={{
                    title: lang.Home,
                    tabBarHideOnKeyboard: true,
                    // unmountOnBlur: false
                }}
                name={'Home'}

                component={activeRoute.HomeTabScreen}

                initialParams={{
                    name: lang.Home,
                    icon: ImageHelper.svgs.tabSvgs.Home,
                    // selectedIcon: ImageHelper.SVG.HomeTab_Selected,
                }}
            />
            <Tab.Screen
                options={{
                    title: lang.DashBoard,
                    tabBarHideOnKeyboard: true,
                    // unmountOnBlur: false
                }} name={'DashBoard'}
                component={activeRoute.DashboardTabScreen}
                initialParams={{
                    name: lang.DashBoard,
                    icon: ImageHelper.svgs.tabSvgs.Dashboard,
                    // selectedIcon: ImageHelper.SVG.HomeTab_Selected,
                }}
            />
            <Tab.Screen
                options={{
                    title: lang.Community,
                    tabBarHideOnKeyboard: true,
                    // unmountOnBlur: false
                }} name={'Community'}
                component={activeRoute.CommunityTabSceen}
                initialParams={{
                    name: lang.Community,
                    icon: ImageHelper.svgs.tabSvgs.Community,
                    // selectedIcon: ImageHelper.SVG.HomeTab_Selected,
                }}
            />
            <Tab.Screen
                options={{
                    title: lang.My_Projects,
                    tabBarHideOnKeyboard: true,
                    unmountOnBlur: false
                }}
                name={'My_Projects'}
                component={activeRoute.MyProjectsTabScreen}
                initialParams={{
                    name: lang.My_Projects,
                    icon: ImageHelper.svgs.tabSvgs.My_Projects,
                    // selectedIcon: ImageHelper.SVG.HomeTab_Selected,
                }}
            />
        </Tab.Navigator>
    );
};

//make this component available to the app
export default TabNavigator;
