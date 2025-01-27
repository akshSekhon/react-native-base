import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
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
import CustomScrollView from '../../Components/CustomScrollView'
import CustomTextInput from '../../Components/CustomTextInput'
import { useFormik } from 'formik';
import { validations } from '../../Utils/Validations/common'
import Touchable from '../../Components/Touchable'
import ImageHelper from '../../Assets/Gallery/ImageHelper'
import BackButton from '../../Components/BackButton'
import { pushTo } from '../../Navigations/NavigationService'

const SignUp: FC<any> = () => {
    const { lang, colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false);


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
                    <CustomScrollView
                        contentContainerStyle={{ paddingHorizontal: moderateScale(16) }}

                    >
                        <View style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            paddingVertical: moderateVerticalScale(0),
                            paddingTop: moderateVerticalScale(10),
                        }}>
                            <BackButton />
                        </View>
                        <Text_N style={{ ...textStyles.heading_large, marginTop: moderateScaleVertical(0) }}>{lang.Sign_Up_as_a_Brand}</Text_N>
                        <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                            <View style={{ gap: moderateScaleVertical(14) }}>
                                <CustomTextInput
                                    hederText={lang.Name}
                                    isshowLeftImg
                                    // leftImage={<ImageHelper.SVG.Input.Name height={scale(20)} width={scale(20)} />}
                                    placeholder={'Ex. John Doe'}
                                    onChangeText={formik.handleChange('name')}
                                    onBlur={formik.handleBlur('name')}
                                    value={formik.values.name}
                                    // leftImage={<ImageHelper.SVG.UserName height={scale(32)} width={scale(32)} />}
                                    errorText={formik.errors.name && formik.touched?.name && formik.errors?.name}

                                />

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

                                <CustomTextInput
                                    hederText={lang.Confirm_Password}
                                    isshowLeftImg
                                    // leftImage={<ImageHelper.SVG.Input.Secured height={scale(24)} width={scale(24)} />}
                                    secureTextEntry
                                    placeholder={'**********'}
                                    onChangeText={formik.handleChange('confimPass')}
                                    onBlur={formik.handleBlur('confimPass')}
                                    value={formik.values.confimPass}
                                    // leftImage={<ImageHelper.SVG.UserName height={scale(32)} width={scale(32)} />}
                                    errorText={formik.errors.confimPass && formik.touched?.confimPass && formik.errors?.confimPass}

                                />



                                <CustomTextInput
                                    hederText={lang.GSTIN}
                                    isshowLeftImg
                                    // leftImage={<ImageHelper.SVG.Input.Email height={scale(18)} width={scale(20)} />}

                                    placeholder={'123344554'}
                                    onChangeText={formik.handleChange('gstIn')}
                                    onBlur={formik.handleBlur('gstIn')}
                                    value={formik.values.gstIn}
                                    // leftImage={<ImageHelper.SVG.UserName height={scale(32)} width={scale(32)} />}
                                    errorText={formik.errors.gstIn && formik.touched?.gstIn && formik.errors?.gstIn}

                                />
                            </View>



                            <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                                <CustomButton
                                    title={lang.Sign_Up}
                                    onPress={() => pushTo('AddSocialAccounts')}
                                // onPress={() => pushTo('SignUp')}
                                // loading
                                />
                                <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(10) }}>
                                    <LineView flex={1} height={1} backgroundColor={colors.border_primDark} />
                                    <Text_N style={{ ...textStyles.body_small, textAlign: 'center' }}>{lang.OR}</Text_N>

                                    <LineView flex={1} backgroundColor={colors.border_primDark} height={1} />
                                </View>

                                <CustomBorderButton
                                    title={lang.Sign_Up_With_Google}
                                    renderLeftImage={<ImageHelper.svgs.Google />}
                                    onPress={() => pushTo('AddSocialAccounts')}

                                //     onPress={() => pushTo('Login')}
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

export default SignUp

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
    }
})