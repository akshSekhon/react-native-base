/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  UIManager,
  useColorScheme,
  View
} from 'react-native';
import './Src/ProtoTypes/index';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Routes from './Src/Navigations/Routes';
import { ThemeProvider } from './Src/Providers/ThemeProvider';
import { store } from './Src/Redux';
import { APPEnvironment } from './Src/Services/Networking';

import { notificationListener, requestUserPermission } from './Src/Services/Firebase/NotificationService';
import Splash from './Src/Screens/OnBoarding/SplashScreen';
import { UserProvider } from './Src/Providers/UserProvider';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './Src/Navigations/NavigationService';
// import { notificationListener, requestUserPermission } from './Src/Services/Notification/NotificationServices';
export let currentEnv: APPEnvironment = 'DEV'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false)
  const [routeData, setRouteData] = useState(undefined)

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const backgroundStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const getUniqueId = async () => {
    return await DeviceInfo.getUniqueId()
  }
  useEffect(() => {
    // requestUserPermission()
    // notificationListener()
  }, [])

  return (
    // <Splash />
    <React.StrictMode>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <UserProvider>
              <ThemeProvider>
                <>
                  <NavigationContainer ref={navigationRef}>
                    <Routes />
                  </NavigationContainer>
                </>


                {/* {!loading &&
                <Routes />
              } */}
                {/* <Splash /> */}

              </ThemeProvider>
            </UserProvider>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </React.StrictMode>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
