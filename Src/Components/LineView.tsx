import React, { FC } from 'react';
import { Modal, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
}
const LineView: FC<Props> = ({ ...props }) => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (
        <View
            style={{
                backgroundColor: colors.border_prim,
                ...props
            }}>
        </View>
    );
};

export default React.memo(LineView);
