import React, { FC } from 'react';
import { Modal, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { goBack, pushTo } from '../../../Navigations/NavigationService';
import { getStyles } from '../../../CommonStyles';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import ImageHelper from '../../../Assets/Gallery/ImageHelper';
import Touchable from '../../../Components/Touchable';
import Text_N from '../../../Components/TextComponents/Text_N';
import CustomScrollView from '../../../Components/CustomScrollView';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { moderateScaleVertical } from '../../../CommonStyles/responsiveSize';
import CustomBorderButton from '../../../Components/CustomBorderButton';
import BackButton from '../../../Components/BackButton';


// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
}
const SocialAccountLinkingView: FC<Props> = ({ ...props }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (

        <View>
            <CustomScrollView
                contentContainerStyle={{ paddingHorizontal: moderateScale(16) }}
            >

                <Text_N style={{ ...textStyles.heading_large, marginTop: moderateScaleVertical(0) }}>{lang.Add_Socials}</Text_N>
                <View style={{ gap: moderateScaleVertical(20), marginTop: moderateVerticalScale(20) }}>
                    <View style={{ gap: moderateScaleVertical(14) }}>

                        <CustomBorderButton
                            title={lang.Instagram}
                            renderLeftImage={<ImageHelper.svgs.Instagram />}
                            onPress={() => pushTo('AddSocialAccounts')}
                        />
                        <CustomBorderButton
                            title={lang.YouTube}
                            renderLeftImage={<ImageHelper.svgs.Youtube />}
                            onPress={() => pushTo('AddSocialAccounts')}
                        />
                        <CustomBorderButton
                            title={lang.Facebook}
                            renderLeftImage={<ImageHelper.svgs.Facebook />}
                            onPress={() => pushTo('AddSocialAccounts')}
                        />

                    </View>

                    <Text_N style={{ ...textStyles.title_small, marginTop: moderateScaleVertical(0) }}>{lang.You_can_always_add_more_later}</Text_N>

                    <View style={{ gap: moderateScaleVertical(5), marginTop: moderateVerticalScale(10), flex: 1 }}>
                        <View style={{ flexDirection: 'row', gap: moderateScale(4), flex: 1 }}>
                            <Text_N style={{ ...textStyles.body_medium, color: colors.txt_body }}>{'1.'}</Text_N>
                            <Text_N style={{ ...textStyles.body_small, color: colors.txt_body, flex: 1 }}>{`This is a crucial step in getting most out of Taglo app. It will help us show you real-time stats of your social media that you add.`}</Text_N>
                        </View>

                        <View style={{ flexDirection: 'row', gap: moderateScale(4), flex: 1 }}>
                            <Text_N style={{ ...textStyles.body_medium, color: colors.txt_body }}>{'2.'}</Text_N>
                            <Text_N style={{ ...textStyles.body_small, color: colors.txt_body, flex: 1 }}>{`All the followers and subscribers from your social media will add up to show your Reach. Which will help brands to hire you more faster. `}</Text_N>
                        </View>

                        <View style={{ flexDirection: 'row', gap: moderateScale(4), flex: 1 }}>
                            <Text_N style={{ ...textStyles.body_medium, color: colors.txt_body }}>{'3.'}</Text_N>
                            <Text_N style={{ ...textStyles.body_small, color: colors.txt_body, flex: 1 }}>{`We suggest don't skip this step.`}</Text_N>
                        </View>
                    </View>

                </View>
            </CustomScrollView>
        </View>
    );
};

export default React.memo(SocialAccountLinkingView);
