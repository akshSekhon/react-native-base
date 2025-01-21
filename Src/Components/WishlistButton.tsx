import React, { FC, useEffect, useMemo, useState } from 'react';
import { LayoutAnimation, Modal, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { moderateVerticalScale } from 'react-native-size-matters';
import Text_N from './TextComponents/Text_N';
import ImageHelper from '../Assets/Gallery/ImageHelper';
import Touchable from './Touchable';
import { goBack } from '../Navigations/NavigationService';

import Animated, { useAnimatedRef, useAnimatedStyle, useSharedValue, withClamp, withSpring, withTiming } from 'react-native-reanimated';


// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
    isActive?: boolean
    defaultValue?: boolean
    onValueChange?: (val: boolean) => void
}

const WishlistButton: FC<Props> = ({ defaultValue, isActive, onValueChange }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    const [active, setActive] = useState(defaultValue)
    const scaleVal = useSharedValue(1);

    useEffect(() => {
        setActive(defaultValue);
    }, [defaultValue]);

    const onChangeState = () => {
        const aniFrom = active ? 0.4 : 1.5
        scaleVal.value = withSpring(aniFrom, { damping: 10, stiffness: 100 }, () => {
            scaleVal.value = withSpring(1);
        });
        const newActiveState = !active;
        setActive(newActiveState);
        onValueChange?.(newActiveState);
    };


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scaleVal.value }],
    }));

    const buttonStyle = useMemo(
        () => ({
            borderRadius: 100,
            borderColor: colors.border_action,
            backgroundColor: active ? colors.bg_action : colors.transparent,
            borderWidth: 1.6,
        }),
        [active, colors]
    );

    const iconColor = useMemo(
        () => (active ? colors.bg_primary : colors.bg_action),
        [active, colors]
    );

    return (

        <View>
            <Touchable slopArea={10} onPress={onChangeState} style={buttonStyle}>
                <Animated.View style={animatedStyle}>
                    {active ? (
                        <ImageHelper.svgs.Heart_Fill style={{ color: iconColor }} />
                    ) : (
                        <ImageHelper.svgs.Heart_Unfill style={{ color: iconColor }} />
                    )}
                </Animated.View>
            </Touchable>
        </View>
    );
};

export default React.memo(WishlistButton);
