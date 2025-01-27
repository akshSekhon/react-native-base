import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import { Pagination } from "react-native-snap-carousel"
import SystemNavigationBar from 'react-native-system-navigation-bar'
import ImageHelper from '../../Assets/Gallery/ImageHelper'
import { getStyles } from '../../CommonStyles'
import { textScale } from '../../CommonStyles/responsiveSize'
import { WrapperContainer } from '../../Components'
import AppLogo from '../../Components/AppLogo'
import Text_N from '../../Components/TextComponents/Text_N'
import { ThemeContext } from '../../Providers/ThemeProvider'
import { validations } from '../../Utils/Validations/common'
import SelectPreferencesView from './Components/SelectPreferencesView'
import UpgradeToPremiumView from './Components/UpgradeToPremiumView'
import SocialAccountLinkingView from './Components/SocialAccountLinkingView'
import Touchable from '../../Components/Touchable'
import { CustomUseEffect } from '../../Utils/Hooks/CustomUseEffect'
import BackButton from '../../Components/BackButton'
import { goBack, navigateAndReset } from '../../Navigations/NavigationService'
import { useUser } from '../../Providers/UserProvider'

const AddSocialAccounts: FC<any> = () => {
    const { lang, colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const { profileType } = useUser()
    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    }, [isFocused]);


    const formik = useFormik({
        validationSchema: validations.signup,
        initialValues: {
            name: '',
            email: '',
            phone_number: '',
            phone_code: '',
            country_code: '',
            password: '',
            confimPass: '',
            gstIn: '',


        },
        onSubmit: (values) => {
            // pushTo('SignUp')

            // requestToRegister(values)
        },
    });

    const [currentScreen, setCurrentScreen] = useState(0)

    const screenArr = Array(3)

    const moveToNext = () => {
        if (currentScreen < screenArr.length - 1) {
            setCurrentScreen(currentScreen + 1)
        } else {
            // pushTo('Welcome')
            if (profileType == 'brand') {
                navigateAndReset('brandStack')
            } else {
                navigateAndReset('createrStack')
            }
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: 'TabNavigator', params: undefined }],
            //     })
            // );
        }
    }

    const moveBack = () => {
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1)
        } else {
            goBack()
            // pushTo('Welcome')
        }
    }

    const renderCurrentScreen = useCallback(() => {
        switch (currentScreen) {
            case 0:
                return <SocialAccountLinkingView />;
                break;
            case 1:
                return <SelectPreferencesView
                    onPressNext={() => moveToNext()}
                />;
                break;
            case 2:
                return <UpgradeToPremiumView />;
                break;
            default:
                break;
        }

    }, [currentScreen])




    return (
        <WrapperContainer
            bgColor={colors.bg_action}
            issafeAreaView
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
                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        paddingVertical: moderateVerticalScale(0),
                        paddingHorizontal: moderateVerticalScale(16),
                        paddingTop: moderateVerticalScale(10),
                    }}>
                        <BackButton
                            onPressBack={moveBack}
                        />
                    </View>
                    <View style={{ flex: 1 }}>

                        {renderCurrentScreen()}
                    </View>
                    {/* MARK: -- Footer */}

                    <View style={{ ...comnViewStyles.rowContainerSB, paddingHorizontal: moderateScale(16) }}>
                        <View>
                            <Pagination
                                dotsLength={screenArr.length}
                                activeDotIndex={currentScreen}
                                containerStyle={{ width: 30, paddingVertical: 10, }}
                                dotStyle={{ ...styles.dotStyle, backgroundColor: colors.txt_action }}
                                inactiveDotStyle={{
                                    ...styles.inActivedotStyle,
                                    backgroundColor: colors.bg_Disable,
                                }}
                                tappableDots
                                inactiveDotOpacity={1}
                                inactiveDotScale={0.8}
                            />
                        </View>
                        <Touchable
                            onPress={moveToNext}
                            style={{ ...comnViewStyles.rowContainer_A_C }}
                        >
                            <Text_N>{lang.Skip}</Text_N>
                            <ImageHelper.svgs.Angle_left style={{ color: colors.icon_Zblack }} rotation={180} />
                        </Touchable>
                    </View>
                    <View />


                </View>
            </View>
        </WrapperContainer>

    )
}

export default AddSocialAccounts

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
        // backgroundColor: 'red'
    },
    dotStyle: {
        height: scale(12),
        aspectRatio: 1,
        borderRadius: 100,
        marginHorizontal: 0,
        // borderWidth: 2,
    },
    inActivedotStyle: {
        height: scale(12),
        aspectRatio: 1,
        borderRadius: 100,
        marginHorizontal: 0,
        borderWidth: 0,
    },
})