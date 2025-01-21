//import liraries
import React, { Component, FC, memo } from 'react';
import { View, Text, StyleSheet, TextProps } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getStyles } from '../../CommonStyles';
import { ThemeContext } from '../../Providers/ThemeProvider.tsx';
import { textScale } from '../../CommonStyles/responsiveSize';
import { fontFamily } from '../../Assets/Fonts/FontFamily.tsx';

// create a component
interface props extends TextProps {
    children?: React.ReactNode;
    color?: string;
}
const Text_Press: FC<props> = memo(({ children, color, style, ...props }) => {

    const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext);

    return (<Text style={[{ ...styles.text, color: color ?? colors.textWhite }, style]} {...props}>{children}</Text>);
});

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    text: {
        color: 'red',
        fontSize: textScale(14),
        fontFamily: fontFamily.Inter_variable,
        // textAlign: 'center',
    },
});

//make this component available to the app
export default Text_Press;