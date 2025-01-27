import React, { FC, useEffect, useState } from 'react';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends KeyboardAwareScrollViewProps {
    onEndReached?: () => void
}
const CustomScrollView: FC<Props> = ({ onEndReached, ...props }) => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    const [isEndReached, setIsEndReached] = useState(false);

    useEffect(() => {
        if (isEndReached && onEndReached) {

            onEndReached()
        }
    }, [isEndReached])

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
        if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20) {
            if (!isEndReached) {
                console.log('End reached!');
                setIsEndReached(true);
            }
        } else {
            setIsEndReached(false);
        }
    };
    return (
        <KeyboardAwareScrollView
            style={[{ flexGrow: 1 }, props?.style]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            {...props}
        >
            {props?.children}
        </KeyboardAwareScrollView>
    );
};

export default React.memo(CustomScrollView);
