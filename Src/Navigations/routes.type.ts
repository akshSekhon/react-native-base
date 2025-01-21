import { screens } from '../index.tsx';
export type ScreenNames = keyof typeof screens;

export type ScreenItem = {
    name: ScreenNames;
    component: React.ComponentType<any>;
};

export type DataTypeForTabBarRoute<T extends keyof TabBarRouteList> = TabBarRouteList[T]['data'];

export type RouteParamList = {
    // WelcomeScreen: { isLogedIn: boolean, onBoardingCompleted: boolean },
    Welcome: undefined,
    SplashScreen:undefined,
    Login: undefined,
    SignUp: undefined,
    AddSocialAccounts: undefined,
    TabNavigator: { routeName?: keyof TabBarRouteList, data?: DataTypeForTabBarRoute< keyof TabBarRouteList> },

};

export type TabBarRouteList = {
    Home: { name: string, icon: any, data: undefined },
    DashBoard: { name: string, icon: any, data: undefined },
    Community: { name: string, icon: any, data: {isComeBackFromChat:boolean} },
    My_Projects: { name: string, icon: any, data: undefined },
};
// export type RoutePropList = {
   
// }