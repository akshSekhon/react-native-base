//import liraries
import React, { FC } from 'react';
import { Image, ImageStyle, Platform, Pressable, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, useColorScheme, } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { moderateScale, scale } from 'react-native-size-matters';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider.tsx';
import { moderateScaleVertical } from '../CommonStyles/responsiveSize.tsx';
// import { getStyles } from '../HelperFiles/HelperFunction';

// create a component

interface props {
    containerStyle?: ViewStyle,
    innerContainerStyle?: ViewStyle,
    titleStyle?: TextStyle,
    title?: String,
    onPress?: () => void,
    onDisablePress?: () => void,
    isdisable?: boolean,
    disableClick?: boolean,
    loading?: boolean,
    isDigonal?: boolean,
    rightImage?: any,
    rederRight?: () => void,
    leftImage?: any,
    renderLeftImage?: any,
    leftIconStyle?: ImageStyle,
    rightIconStyle?: ImageStyle
    bgColors?: Array<string>
    inicatorScale?: number
    disableBottomLine?: boolean,
}

const CustomBorderButton: FC<props> = ({
    containerStyle,
    innerContainerStyle,
    titleStyle,
    title,
    onPress,
    onDisablePress = () => { },
    isdisable = false,
    disableClick = false,
    // bgColors = colors.theme,
    loading = false,
    isDigonal = true,
    rightImage,
    rederRight = () => { },
    leftImage,
    renderLeftImage,
    leftIconStyle,
    rightIconStyle,
    bgColors = [],
    inicatorScale = scale(22),
    disableBottomLine = false
}) => {
    const scheme = useColorScheme()
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    var btnColors = bgColors
    if (bgColors?.length <= 0) {
        btnColors = [colors.transparent, colors.transparent]
    }
    let colorArr = isDigonal ? btnColors.reverse() : btnColors;

    const onPressDisabled = () => {
        const options = {
            enableVibrateFallback: true,
            ignoreAndroidSystemSettings: false,
        };
        RNReactNativeHapticFeedback.trigger('impactHeavy', options);
        onDisablePress()
    }


    return (
        // <View>
        <TouchableOpacity
            disabled={disableClick}
            activeOpacity={0.9}
            style={{ ...comnViewStyles.button, backgroundColor: colors.transparent, ...containerStyle }}
            onPress={!isdisable && !loading ? onPress : onPressDisabled}
        // onPressIn={onPressDisabled}
        >
            <>
                <LinearGradient
                    colors={!isdisable ? colorArr : [colors.transparent, colors.transparent]}
                    style={{
                        ...styles.linearGradiant,
                        bottom: disableBottomLine ? 0 : 2,
                        marginHorizontal: disableBottomLine ? 0 : 0.1,
                        // borderColor: colors.bg_actionSec,
                        borderColor: isdisable ? colors.txt_disable : colors.txt_on_ActionSec,

                        ...innerContainerStyle
                    }}
                    start={isDigonal ? { x: 0.85, y: 0 } : { x: 0, y: 0 }}
                    end={isDigonal ? { x: 0.3, y: 1 } : { x: 0, y: 0.95 }}
                >
                    {/* <Text style={{ ...TextStyles.btnTitle, ...titleStyle }} >
                    {title}
                </Text> */}
                    {!loading && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: moderateScale(5),
                            }}>
                            {renderLeftImage &&
                                <View style={{ ...leftIconStyle }}>
                                    {renderLeftImage}

                                </View>
                            }

                            {leftImage && (
                                <Image
                                    resizeMode="contain"
                                    style={{ ...styles.icon, ...rightIconStyle }}
                                    source={leftImage}
                                />
                            )}

                            <Text
                                style={{
                                    ...textStyles.actn_large,
                                    ...styles.btnText,
                                    color: isdisable ? colors.txt_disable : colors.txt_on_ActionSec,
                                    ...titleStyle,

                                }}>
                                {title}
                            </Text>

                            {/* {rederRight && rederRight} */}
                            {rederRight ?
                                <>
                                    {rederRight()}
                                </>
                                : rightImage
                                && (
                                    <Image
                                        resizeMode="contain"
                                        style={{ ...styles.icon, ...rightIconStyle }}
                                        source={rightImage}
                                    />
                                )}
                        </View>
                    )}
                    {loading && (
                        <View style={{ flex: 1 }}>
                            <MaterialIndicator
                                color={colors.txt_on_Action}
                                size={inicatorScale}
                            />
                        </View>
                    )}
                </LinearGradient>
            </>
        </TouchableOpacity>
        // </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    linearGradiant: {
        borderRadius: scale(8),
        // paddingVertical: Platform.OS == 'ios' ? moderateScaleVertical(15) : moderateScaleVertical(15),
        height: Platform.OS == 'ios' ? moderateScaleVertical(35) : moderateScaleVertical(45),
        borderWidth: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        includeFontPadding: false,
        // textTransform: 'lowercase',
    },
    icon: {
        height: scale(15),
        width: scale(15),
    },
});

//make this component available to the app
export default React.memo(CustomBorderButton);
