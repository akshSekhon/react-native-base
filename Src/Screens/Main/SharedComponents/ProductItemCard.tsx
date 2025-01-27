import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { getStyles } from '../../../CommonStyles';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import { shadowBox } from '../../../CommonStyles/CommonViewStyles';
import { moderateScaleVertical } from '../../../CommonStyles/responsiveSize';
import ScalableAnimation from '../../../Components/HOC/ScalableAnimation';
import LoaderImage from '../../../Components/LoaderImage';
import ImageHelper from '../../../Assets/Gallery/ImageHelper';
import ViewBackground from '../../../Components/ViewBackground';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Text_N } from '../../../Components';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
    onPressCard?: () => void,
    containerStyle?: ViewStyle
    index: number
    item: any
}

const ProductItemCard: FC<Props> = ({ item, ...props }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    const dataArr = ['Beauty', 'Men']
    return (
        <View style={{ flex: 0.5, gap: moderateVerticalScale(0), ...props?.containerStyle }}>
            <ScalableAnimation
                onPress={props?.onPressCard}
            >
                <ViewBackground
                    masterStyle={{ borderRadius: 8, overflow: 'hidden' }}
                    style={{
                        flex: 1,
                        aspectRatio: 1 / 1.5,
                        justifyContent: 'flex-end',
                        paddingHorizontal: moderateScale(5)
                    }}
                    backgroundChildren={
                        <View style={{ flex: 1 }}>
                            <FastImage
                                source={ImageHelper.temp.product6}
                                resizeMode='cover'
                                style={{ flex: 1 }}
                            />
                            <LinearGradient
                                style={{ ...comnViewStyles.absolute0 }}
                                colors={['#0000', '#0008']}
                            />
                        </View>
                    }
                >

                    <View style={{
                        ...comnViewStyles.rowContainer_A_C,
                        gap: moderateScale(10),
                        marginBottom: moderateScaleVertical(10),
                        // flex: 1,
                        // backgroundColor: 'red'
                    }}>

                        <Text_N style={{ ...textStyles.actn_x_small, color: colors.txt_white, }}>
                            {'Daily Life Forever52 16 Color Camouflage HD Concealer Palette - CHP001'}
                        </Text_N>
                    </View>
                </ViewBackground>
            </ScalableAnimation>
        </View>
    );
};

const style = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: moderateScale(5),
        columnGap: moderateScale(8)
    }
})
export default React.memo(ProductItemCard);
