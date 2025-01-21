import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { getStyles } from '../../CommonStyles'
import { ThemeContext } from '../../Providers/ThemeProvider'
import { WrapperContainer } from '../../Components'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { CommonActions, StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import AppLogo from '../../Components/AppLogo'
import { moderateScaleVertical, textScale } from '../../CommonStyles/responsiveSize'
import Text_N from '../../Components/TextComponents/Text_N'
import LineView from '../../Components/LineView'
import CustomButton from '../../Components/CustomButton'
import CustomBorderButton from '../../Components/CustomBorderButton'
import CustomScrollView from '../../Components/CustomScrollView'
import CustomTextInput from '../../Components/CustomTextInput'
import { useFormik } from 'formik';
import { validations } from '../../Utils/Validations/common'
import Touchable from '../../Components/Touchable'
import ImageHelper from '../../Assets/Gallery/ImageHelper'
import BackButton from '../../Components/BackButton'
import { navigateAndReset, pushTo } from '../../Navigations/NavigationService'

const Login: FC<any> = () => {
    const { lang, colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    const isFocused = useIsFocused()
    const [profileType, setProfileType] = React.useState<UserType | string>();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()


    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    }, [isFocused]);


    const formik = useFormik({
        validationSchema: validations.login,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            // pushTo('SignUp')

            // requestToRegister(values)
        },
    });


    const onPressLogin = () => {
        // navigation.navigate('TabNavigator')
        // navigation.dispatch(
        //     StackActions.replace('TabNavigator', { user: 'Wojtek' })
        // );
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator', params: undefined }],
                })
            );
        }, 100);

    }

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
                    <CustomScrollView>
                        <View style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            paddingVertical: moderateVerticalScale(0),
                            paddingTop: moderateVerticalScale(10),
                        }}>
                            <BackButton />
                        </View>
                        <Text_N style={{ ...textStyles.heading_large, marginTop: moderateScaleVertical(0) }}>{lang.Log_In_as_a_Brand}</Text_N>
                        <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                            <View style={{ gap: moderateScaleVertical(14) }}>

                                <CustomTextInput
                                    hederText={lang.Email_Phone_No}
                                    isshowLeftImg
                                    // leftImage={<ImageHelper.SVG.Input.Email height={scale(18)} width={scale(20)} />}

                                    placeholder={lang.plcholder_Facebook_email_or_phone_no}
                                    onChangeText={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    value={formik.values.email}
                                    // leftImage={<ImageHelper.SVG.UserName height={scale(32)} width={scale(32)} />}
                                    errorText={formik.errors.email && formik.touched?.email && formik.errors?.email}

                                />


                                <CustomTextInput
                                    hederText={lang.Password}
                                    secureTextEntry
                                    // leftImage={<ImageHelper.SVG.Input.Secured height={scale(24)} width={scale(24)} />}
                                    isshowLeftImg
                                    placeholder={'**********'}
                                    onChangeText={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                    value={formik.values.password}
                                    // leftImage={<ImageHelper.SVG.UserName height={scale(32)} width={scale(32)} />}
                                    errorText={formik.errors.password && formik.touched?.password && formik.errors?.password}

                                />
                            </View>

                            <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                                <CustomButton
                                    title={lang.Log_In}
                                    onPress={onPressLogin}
                                />
                                <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(10) }}>
                                    <LineView flex={1} height={1} backgroundColor={colors.border_primDark} />
                                    <Text_N style={{ ...textStyles.body_small, textAlign: 'center' }}>{lang.OR}</Text_N>

                                    <LineView flex={1} backgroundColor={colors.border_primDark} height={1} />
                                </View>

                                <CustomBorderButton
                                    title={lang.Log_In_With_Google}
                                    renderLeftImage={<ImageHelper.svgs.Google />}
                                // onPress={() => pushTo('AddSocialAccounts')}
                                // // loading
                                />
                            </View>
                        </View>
                    </CustomScrollView>
                    <View />


                </View>
            </View>
        </WrapperContainer>

    )
}

export default Login

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
        paddingHorizontal: moderateScale(16),
        // backgroundColor: 'red'
    }
})