import { screens } from '../index.tsx';
import { NavigatorScreenParams } from '@react-navigation/native';

export type ScreenNames = keyof typeof screens;

export type ScreenItem = {
    name: ScreenNames;
    component: React.ComponentType<any>;
};

export type DataTypeForTabBarRoute<T extends keyof TabBarRouteList> = TabBarRouteList[T]['data'];


// MARK:- Tab Routes Stack 
export type TabBarRouteList = {
    Home: { name: string, icon: any, data: undefined },
    DashBoard: { name: string, icon: any, data: undefined },
    Community: { name: string, icon: any, data: { isComeBackFromChat: boolean } },
    My_Projects: { name: string, icon: any, data: undefined },
};

export type BrandTabRouteList = TabBarRouteList
export type CreaterTabRouteList = TabBarRouteList


// MARK:- Auth Stack 
export type AuthRouteParamList = {
    Welcome: undefined,
    Login: undefined,
    SignUp: undefined,
    AddSocialAccounts: undefined,
}

// MARK:- Brand Stack 
export type BrandRouteParamList = {
    BrandTabNavigator?: { routeName?: keyof BrandTabRouteList, data?: DataTypeForTabBarRoute<keyof BrandTabRouteList> },


}
// MARK:- Creater Stack
export type CreaterRouteParamList = {
    CreaterTabNavigator?: { routeName?: keyof CreaterTabRouteList, data?: DataTypeForTabBarRoute<keyof CreaterTabRouteList> },
    BrandDetail: undefined,

}


// MARK:- Route Stack 
export type RouteStackParams = {
    // WelcomeScreen: { isLogedIn: boolean, onBoardingCompleted: boolean },
    SplashScreen: undefined
    authStack: undefined,
    createrStack: undefined,
    brandStack: undefined,

};

// MARK:- All Screens
export type RouteParamList = AuthRouteParamList & BrandRouteParamList & CreaterRouteParamList & RouteStackParams
