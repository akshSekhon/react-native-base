import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { getStyles } from '../../../../CommonStyles';
import { ThemeContext } from '../../../../Providers/ThemeProvider';
import { shadowBox } from '../../../../CommonStyles/CommonViewStyles';
import { moderateScaleVertical } from '../../../../CommonStyles/responsiveSize';
import ScalableAnimation from '../../../../Components/HOC/ScalableAnimation';
import LoaderImage from '../../../../Components/LoaderImage';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
    onPressCard?: () => void,
    containerStyle?: ViewStyle
    item: any
}

const BrandCardItem: FC<Props> = ({ item, ...props }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    const dataArr = ['Beauty', 'Men']
    return (
        <View style={{ flex: 1, gap: moderateVerticalScale(10), ...props?.containerStyle }}>
            <ScalableAnimation
                onPress={props?.onPressCard}
            >
                <View style={{
                    ...shadowBox({}),
                    height: 120,
                    width: 100,
                    borderRadius: 5,
                    backgroundColor: colors.appBg,
                    paddingBottom: moderateScaleVertical(5),
                    overflow: 'hidden'
                }}>

                    <LoaderImage
                        uri={item?.image}
                        resizeMode='cover'
                        style={{ flex: 1, }}
                    />

                    <LoaderImage
                        uri={item?.icon}
                        style={{ height: moderateScale(25) }}
                    />
                </View>

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
export default React.memo(BrandCardItem);
