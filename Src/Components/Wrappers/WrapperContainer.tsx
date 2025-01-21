import React, { FC, useEffect } from "react";
import { ImageBackground, ImageSourcePropType, KeyboardAvoidingView, Platform, StatusBar, StatusBarStyle, StyleSheet, View, ViewStyle, useColorScheme } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getStyles } from "../../CommonStyles/index.tsx";
import { moderateScale } from "../../CommonStyles/responsiveSize";
import { ThemeContext } from "../../Providers/ThemeProvider.tsx";
import Loader from "../Loader";

interface WrapperContainerProps {
  children?: any,
  renderHeader?: any,
  refreshControl?: any,
  statusBarAvailable?: boolean,
  isSafeAreaAvailable?: boolean,
  onlyScrollViewAvailable?: boolean,
  isBacgroundImage?: boolean,
  scrollViewBouncesEnable?: boolean,
  isLoading?: boolean,
  issafeAreaView?: boolean,
  isBottomPadding?: boolean,
  paddingAvailable?: boolean,
  mainViewStyle?: ViewStyle,
  contentContainerStyle?: ViewStyle,
  safeAreaViewStyle?: ViewStyle,
  barStyle?: StatusBarStyle,
  backgroundImage?: ImageSourcePropType,
  navBarColor?: string,
  bgColor?: string,
  isPaddingTop?: boolean,
  backgroundType?: 'top_bottom' | 'bottom' | 'image',
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  isAvoidKeyBoard?: boolean

}
const WrapperContainer: FC<WrapperContainerProps> = ({
  children,
  statusBarAvailable = true,
  isSafeAreaAvailable = false,
  onlyScrollViewAvailable = false,
  scrollViewBouncesEnable = false,
  paddingAvailable = false,
  mainViewStyle,
  refreshControl,
  contentContainerStyle,
  isLoading = false,
  renderHeader,
  navBarColor,
  bgColor,
  isBacgroundImage = false,
  backgroundImage,
  issafeAreaView = false,
  safeAreaViewStyle,
  isBottomPadding = false,
  barStyle = 'dark-content',
  backgroundType = 'bottom',
  isPaddingTop,
  pointerEvents = 'auto',
  isAvoidKeyBoard = false
}) => {
  useEffect(() => {
    // SystemNavigationBar.stickyImmersive(true)
    // SystemNavigationBar.setBarMode('light')
  }, [])
  const colorScheme = useColorScheme()
  // const { colors, comnViewStyles, textStyles } = getStyles(colorScheme)
  const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
  const topBarStyle: StatusBarStyle = barStyle ? barStyle : colorScheme == 'dark' ? 'light-content' : colorScheme == 'light' ? 'dark-content' : 'default'

  if (!bgColor) bgColor = colors?.appBg

  const bgColorSet =
    isBacgroundImage && (backgroundImage || backgroundType) ? colors.transparent : bgColor;
  // const load = useSelector((state) => state?.appReducer?.appLoading);
  const inset = useSafeAreaInsets()// { top: 0, bottom: 0, left: 0, right: 0 } //
  const WithOnlyScrollView = () => {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, flexGrow: 1 }}
          keyboardShouldPersistTaps={"always"}
          onResponderMove={() => console.log("hellojhjkhkjhkj")}
          bounces={scrollViewBouncesEnable}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingBottom: moderateScale(10),
            flexGrow: 1,
            ...contentContainerStyle,
          }}
          refreshControl={refreshControl}
        // stickyHeaderIndices={[0]}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  };

  const contentView = () => {
    return (
      <>
        <View style={{
          flex: 1,
          backgroundColor: isBacgroundImage ? colors.transparent : navBarColor ?? bgColor,
        }}>
          {issafeAreaView &&
            <View style={{
              height: inset.top,
              backgroundColor: isBacgroundImage ? colors.transparent : navBarColor ?? bgColor,
              ...safeAreaViewStyle
            }} />
          }
          {renderHeader && renderHeader}
          {/* <FlashMessage position="top" style={{ top: moderateScaleVertical(0)}} /> */}
          <Loader isLoading={isLoading} />
          <View
            pointerEvents={pointerEvents}
            style={{
              ...styles.container,
              paddingHorizontal: paddingAvailable ? moderateScale(16) : 0,
              // paddingBottom: Platform.OS == 'ios' && isBottomPadding ? inset.bottom : 0,
              backgroundColor: bgColorSet,
              paddingTop: isPaddingTop ? inset.top : null,
              paddingBottom: inset.bottom,
              ...mainViewStyle,
            }}
          >

            {statusBarAvailable ? (
              <StatusBar
                networkActivityIndicatorVisible={isSafeAreaAvailable}
                translucent={!isSafeAreaAvailable}
                backgroundColor={isSafeAreaAvailable ? colors.transparent : colors.transparent}
                barStyle={topBarStyle}
                showHideTransition={"slide"}
                animated
                hidden={false}
              />
            ) : (
              <></>
            )}

            {onlyScrollViewAvailable ? WithOnlyScrollView() : children}

          </View>
        </View>
        {/* </SafeAreaView> */}
      </>
    );
  };


  const renderContent = () => (
    <>
      {isBacgroundImage ? (
        <>
          {backgroundType == 'top_bottom' ?
            <>
              {/* <AppCircleBg > */}
              {isAvoidKeyBoard ?
                <KeyboardAvoidingView
                  style={{ flex: 1, backgroundColor: colors.transparent }}
                  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                  {contentView()}

                </KeyboardAvoidingView>
                :
                <>{contentView()}</>
              }

              {/* </AppCircleBg> */}
            </> :
            backgroundType == 'image' ?
              <>
                <ImageBackground
                  style={{ flex: 1 }}
                  resizeMode={"stretch"}
                  source={backgroundImage}
                >
                  {isAvoidKeyBoard ?
                    <KeyboardAvoidingView
                      style={{ flex: 1, backgroundColor: colors.transparent }}
                      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                      {contentView()}

                    </KeyboardAvoidingView>
                    :
                    <>{contentView()}</>
                  }
                </ImageBackground>
              </> :
              <>
                {/* <AppBG> */}
                {isAvoidKeyBoard ?
                  <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: colors.transparent }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                  >
                    {contentView()}
                  </KeyboardAvoidingView>
                  :
                  <>{contentView()}</>
                }
                {/* </AppBG> */}
              </>
          }
        </>
      ) : (
        <>
          {isAvoidKeyBoard ?
            <KeyboardAvoidingView
              style={{ flex: 1, backgroundColor: colors.transparent }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              {contentView()}

            </KeyboardAvoidingView>
            :
            <>{contentView()}</>
          }
        </>
      )}


    </>
  )

  return (
    <>
      {renderContent()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
});

export default WrapperContainer
