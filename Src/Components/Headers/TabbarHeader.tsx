import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
// import { getStyles } from '../HelperFiles/HelperFunction';
import ImageHelper from '../../Assets/Gallery/ImageHelper';
import { getStyles } from '../../CommonStyles';
import { getCurrentRoute, goBack, navigationRef } from '../../Navigations/NavigationService';
import { ThemeContext } from '../../Providers/ThemeProvider';
import Text_N from './../TextComponents/Text_N';
import Touchable from './../Touchable';
import { fontFamily } from '../../Assets/Fonts/FontFamily';
import { moderateScale, moderateScaleVertical, scale, textScale } from '../../CommonStyles/responsiveSize';
import { getFocusedRouteNameFromRoute, useNavigation, useNavigationState } from '@react-navigation/native';
import LoaderImage from '../LoaderImage';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props {
    onPressProfile?: () => void
    onPressPremium?: () => void
    leftTitle?: string | null,
    isLeftTitle?: boolean
}

const TabbarHeader: FC<Props> = ({
    isLeftTitle = true,
    leftTitle,
    ...props }) => {
    const navigation = useNavigation()
    const route = getCurrentRoute()

    const navigationState = useNavigationState((state) => state);
    const currentRoute = navigationState.routes[navigationState.index];
    const screenTitle = currentRoute.name; // Or currentRoute.params?.title if you pass it in params
    console.log('currentRoute :---', navigationState);
    // let routename = navigationRef.getCurrentOptions()?.title ?? ''

    // console.log('navigationRef.getCurrentOptions():--', navigationRef.getCurrentOptions());

    // useEffect(() => {
    //     setTimeout(() => {

    //         routename = navigationRef.getCurrentOptions()?.title ?? ''
    //     }, 100);
    // }, [])
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (
        <View style={{ ...comnViewStyles.rowContainer_A_C, paddingHorizontal: moderateScale(10), paddingVertical: moderateScaleVertical(1) }}>

            <View style={{ ...comnViewStyles.rowContainer_A_C, flex: 1 }} >
                {isLeftTitle &&
                    <Text_N style={{ ...textStyles.title_small }}>{!!leftTitle ? leftTitle : screenTitle ?? ''}</Text_N>
                }
            </View>
            <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(5) }}>
                {/* Get premium button */}

                <Touchable
                    onPress={props.onPressProfile ?? goBack}
                    style={{ ...styles.getPremButton, backgroundColor: colors.bg_action }}
                >
                    <Text_N style={{ ...textStyles.actn_medium, color: colors.txt_on_action }}>{lang.Get_Premium}</Text_N>
                </Touchable>

                {/* User profile Image */}
                <Touchable
                    onPress={props.onPressProfile ?? goBack}
                    style={{ padding: 2, }}
                >
                    <LoaderImage
                        uri={Image.resolveAssetSource(ImageHelper.pngs.brand_user).uri}
                        resizeMode='contain'
                        style={{
                            height: scale(42),
                            aspectRatio: 1,
                            borderRadius: 100,
                            paddingTop: 3,
                            backgroundColor: colors.bg_secLight,
                        }}
                    />
                </Touchable>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    getPremButton: {
        padding: 0,
        // paddingVertical: moderateScaleVertical(8),
        height: moderateScale(42),
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(12),
        borderRadius: 100
    }
});
export default React.memo(TabbarHeader);
