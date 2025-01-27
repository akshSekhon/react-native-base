import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext, useEffect } from 'react'
import { getStyles } from '../../CommonStyles'
import { ThemeContext } from '../../Providers/ThemeProvider'
import { WrapperContainer } from '../../Components'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useIsFocused } from '@react-navigation/native'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import AppLogo from '../../Components/AppLogo'
import { moderateScaleVertical, textScale } from '../../CommonStyles/responsiveSize'
import Text_N from '../../Components/TextComponents/Text_N'
import LineView from '../../Components/LineView'
import CustomButton from '../../Components/CustomButton'
import CustomBorderButton from '../../Components/CustomBorderButton'
import { pushTo } from '../../Navigations/NavigationService'
import ImageHelper from '../../Assets/Gallery/ImageHelper'
import Touchable from '../../Components/Touchable'
import { showToastMessage } from '../../Utils'

import { UserContext, useUser } from '../../Providers/UserProvider'
import ToggleButton from '../../Components/ToggleButton'
const Welcome: FC<any> = () => {
    const { lang, colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    const { profileType, setProfileType } = useUser()
    const isFocused = useIsFocused()

    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    }, [isFocused]);

    return (
        <WrapperContainer
            bgColor={colors.bg_action}
            issafeAreaView
        // onlyScrollViewAvailable
        // isBacgroundImage
        >
            <View
                style={styles.container}
            >
                <View style={styles.logoContainer}>
                    <AppLogo logoSize={45} textSize={textScale(42)} />
                </View>
                {/* MARK: -- Content container */}
                <View
                    style={{ ...styles.roundContainer, backgroundColor: colors.appBg }}
                >
                    <View style={{ ...comnViewStyles.rowContainer_A_C, marginTop: moderateScale(20), gap: moderateScale(8) }}>
                        <Text_N style={{ ...textStyles.actn_large, }}>{lang.I_m_a}</Text_N>
                        <LineView width={1.2} height={'80%'} />
                        <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(6) }}>
                            <Touchable
                                onPress={() => setProfileType('brand')}
                                style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(5) }}>
                                <View
                                    style={{ padding: 0 }}
                                >
                                    {profileType == 'brand' ?
                                        <ImageHelper.svgs.RadioButton_On />
                                        :
                                        <ImageHelper.svgs.RadioButton_Off />
                                    }
                                </View>

                                <View
                                    style={{ padding: 0 }}
                                >
                                    <Text_N style={{ ...textStyles.actn_large, color: !profileType ? colors.txt_disable : profileType == 'brand' ? colors.txt_action : colors.txt_black }}>{lang.Brand}</Text_N>
                                </View>
                            </Touchable>
                            <Text_N style={{ ...textStyles.body_small, textAlign: 'center', marginHorizontal: moderateScale(0) }}>{lang.OR}</Text_N>

                            <Touchable
                                onPress={() => setProfileType('influencer')}
                                style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(5) }}>
                                <View
                                    style={{ padding: 0 }}
                                >
                                    {profileType == 'influencer' ?
                                        <ImageHelper.svgs.RadioButton_On />
                                        :
                                        <ImageHelper.svgs.RadioButton_Off />

                                    }
                                </View>
                                <View
                                    style={{ padding: 0 }}
                                >
                                    <Text_N style={{ ...textStyles.actn_large, color: !profileType ? colors.txt_disable : profileType == 'influencer' ? colors.txt_action : colors.txt_black }}>{lang.Influencer}</Text_N>
                                </View>
                            </Touchable>
                        </View>

                        {/* </RadioGroup> */}

                    </View>
                    <Text_N style={{ ...textStyles.disp_med, textAlign: 'center' }}>{lang.Welcome}</Text_N>


                    <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                        <CustomButton
                            title={lang.Sign_Up}
                            isdisable={!profileType}
                            onPress={() => pushTo('SignUp')}
                        // loading
                        />
                        <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(10) }}>
                            <LineView flex={1} height={1} backgroundColor={colors.border_primDark} />
                            <Text_N style={{ ...textStyles.body_small, textAlign: 'center' }}>{lang.OR}</Text_N>

                            <LineView flex={1} backgroundColor={colors.border_primDark} height={1} />
                        </View>

                        <CustomBorderButton
                            title={lang.Log_In}
                            isdisable={!profileType}
                            onPress={() => pushTo('Login')}
                        />
                    </View>

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ flex: 0.9, alignItems: 'center' }}>
                            <Image
                                style={{ flex: 1 }}
                                resizeMode='contain'
                                source={profileType == 'brand' ? ImageHelper.pngs.brand_user : profileType == 'influencer' ? ImageHelper.pngs.infulancer_user : ImageHelper.pngs.brand_infulacer_user}
                            />
                        </View>
                    </View>

                    <View />


                </View>
            </View>
        </WrapperContainer>

    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    logoContainer: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundContainer: {
        flex: 1,
        borderTopLeftRadius: scale(35),
        borderTopRightRadius: scale(35),
        overflow: 'hidden',
        paddingHorizontal: moderateScale(16)
        // backgroundColor: 'red'
    }
})