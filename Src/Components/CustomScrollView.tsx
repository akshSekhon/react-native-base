import React, { FC } from 'react';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends KeyboardAwareScrollViewProps {

}
const CustomScrollView: FC<Props> = ({ ...props }) => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (
        <KeyboardAwareScrollView
            style={[{ flexGrow: 1 }, props?.style]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            {...props}
        >
            {props?.children}
        </KeyboardAwareScrollView>
    );
};

export default React.memo(CustomScrollView);
