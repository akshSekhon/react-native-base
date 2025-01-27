// import { StackActions } from "@react-navigation/compat";
import { CommonActions, createNavigationContainerRef, NavigationContainerRef, NavigationState, PartialState, RouteProp, StackActions, useRoute, } from "@react-navigation/native";
import { RouteParamList, RouteStackParams } from "./routes.type";
import React from "react";
import { isFalsy } from "../Utils";
/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
// @see https://reactnavigation.org/docs/navigating-without-navigation-prop
 */

// export var navigationRef = React.createRef<NavigationContainerRef<any>>();
export var navigationRef = createNavigationContainerRef<NavigationContainerRef>();
/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
  navigationRef = navigatorRef;
}



/**
 * Retrieves the current route name.
 */
const getCurrentRouteName = () => {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    console.log("getCurrentRouteName :---", route);
    return route?.name || "";
  }
  return "";
};


const getCurrentRoute = () => {
  if (navigationRef.isReady()) {
    const route = navigationRef.getCurrentRoute();
    console.log("getCurrentRoute :---", route);
    return route || "";
  }
  return "";
};
/**
 * Gets the previous route.
 *
 * @returns The previous route object or null if there is no previous route.
 */
const getPreviousRoute = () => {
  if (navigationRef.isReady()) {
    const state = navigationRef.getRootState();
    const currentRouteIndex = state.index;

    // Check if the current route index is greater than 0
    if (currentRouteIndex > 0) {
      const previousRoute = state.routes[currentRouteIndex - 1];
      console.log("getPreviousRoute :---", previousRoute);
      return previousRoute;
    } else {
      return null;

    }
  }
  return null;
};
/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
async function navigate<T extends keyof RouteParamList>(name: T, params: RouteParamList[T]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.push(name, params)
    );
  }
}

// const pushTo = async (name: keyof RouteParamList, params?:any) => {
//   navigate(name, params)
// }
const pushTo = async <T extends keyof RouteParamList>(name?: T, params?: RouteParamList[T]) => {
  if (!isFalsy(name)) {
    navigate(name, params);
  }
};
export function useTypedRoute<T extends keyof RouteParamList>() {
  return useRoute<RouteProp<RouteParamList, T>>();
}
/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 *
 * 



 * /**
 * Navigates to a specific route and resets the navigation history.
 */

// Function to navigate and reset navigation state
// function navigateAndReset<T extends keyof RouteParamList>(
//   name: T,
//   params?: RouteParamList[T]
// ) {
//   if (navigationRef.isReady()) {

//     navigationRef.resetRoot({
//       index: 0,
//       routes: [{ name, params }],
//     });
//     //   CommonActions.reset({
//     //     index: 0,
//     //     routes: [{ name, params }],
//     //   })
//     // );
//   } else {
//     console.error("Navigation ref is not ready.");
//   }
// }

function navigateAndReset<T extends keyof RouteParamList>(
  name: T,
  params?: any
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({
      index: 0,
      routes: [{ name, params }],
    });
  } else {
    console.error('Navigation ref is not ready.');
  }
}
/**
 * Pops the top screen from the stack.
 */
function popScreen() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}
/**
 * Goes back to the previous screen.
 */
function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}
/**
 * Replaces the current route with a new one.
 */
const replaceNavigateRoute = <T extends keyof RouteParamList>(
  name: T,
  params?: RouteParamList[T]
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch((state: NavigationState) => {
      // Filter out the current route
      const routes = state.routes.filter((r) => r.key !== state.routes[state.index].key);

      // Reset the navigation state with the new route
      return CommonActions.reset({
        index: routes.length,
        routes: [...routes, { name, params }],
      });
    });
  }
};

export {
  navigate,
  navigateAndReset,
  setTopLevelNavigator,
  replaceNavigateRoute,
  popScreen,
  goBack,
  getCurrentRouteName,
  getCurrentRoute,
  getPreviousRoute,
  pushTo
};
