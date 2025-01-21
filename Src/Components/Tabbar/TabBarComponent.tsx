import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { Alert, LayoutAnimation, Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStyles } from '../../CommonStyles/index.tsx';
import { moderateScaleVertical } from '../../CommonStyles/responsiveSize';
import { ThemeContext } from '../../Providers/ThemeProvider.tsx';
import CustomTab from './CustomTab.tsx';
import { pushTo } from '../../Navigations/NavigationService.tsx';

type CustomTabBarProps = BottomTabBarProps;
const TabBarComponent: FC<CustomTabBarProps> = (props) => {
  const { state, descriptors, navigation } = props
  const insets = useSafeAreaInsets();

  const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext);
  const { routes, index, } = state;
  const TabInx = index;

  return (
    <>
      <View style={[styles.tabBar, { paddingBottom: Platform.OS == 'android' ? insets.bottom : 0, top: null, }]}>
        <LinearGradient
          style={[styles.innerContainer, { paddingBottom: Platform.OS == 'android' ? insets.bottom : 0, borderColor: colors.bg_Disable }]}
          colors={[colors.bg_primary, colors.bg_primary]}
        >
          {routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
              navigation.navigate(route.name)
              // Alert.alert('Tab Clicked', route.name)
            };
            return (
              <CustomTab
                tab={route}
                Icon={route?.params?.icon}
                name={route.params?.name ?? ''}
                // SelectedIcon={route.params.icon}
                onPress={onPress}
                // color={renderColor(route.name)}
                isFocused={state.index === index}
                key={route.key}
                index={index}
                activeTabCheck={{ active: TabInx, index: index }}
                containerStyle={{
                  flexGrow: 1,
                  // width:width/5
                }}
              />
            );
          })}
        </LinearGradient>
      </View >
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    width: '100%',
    height: moderateScaleVertical(65),
  },
  innerContainer: {
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: moderateScaleVertical(60),
  }
  , tabBar: {
  },
});

export default TabBarComponent;
