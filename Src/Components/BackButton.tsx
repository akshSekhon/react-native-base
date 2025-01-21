import React, { FC } from 'react';
import { Modal, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { moderateVerticalScale } from 'react-native-size-matters';
import Text_N from './TextComponents/Text_N';
import ImageHelper from '../Assets/Gallery/ImageHelper';
import Touchable from './Touchable';
import { goBack } from '../Navigations/NavigationService';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
    onPressBack?: () => void
}

const BackButton: FC<Props> = ({ ...props }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (

        <Touchable
            onPress={props.onPressBack ?? goBack}
            style={{ ...comnViewStyles.rowContainer_A_C }}
        >
            <ImageHelper.svgs.Angle_left style={{ color: colors.icon_black }} />
            <Text_N style={{ ...textStyles.actn_medium }}>{lang.Back}</Text_N>
        </Touchable>
    );
};

export default React.memo(BackButton);
