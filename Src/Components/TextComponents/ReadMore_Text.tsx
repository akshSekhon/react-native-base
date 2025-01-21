//import liraries
import React, { Component, FC, memo, useState } from 'react';
import { View, Text, StyleSheet, TextProps, NativeSyntheticEvent, TextLayoutEventData, LayoutAnimation, Platform, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getStyles } from '../../CommonStyles/index.tsx';
import { ThemeContext } from '../../Providers/ThemeProvider.tsx';
import { textScale } from '../../CommonStyles/responsiveSize.tsx';
import { fontFamily } from '../../Assets/Fonts/FontFamily.tsx';
import { CustomUseEffect } from '../../Utils/Hooks/CustomUseEffect.tsx';

// create a component
interface props extends TextProps {
    children?: React.ReactNode;
    text?: React.ReactNode;
    noOfLines?: number,
    color?: string;
}
const ReadMore_Text: FC<props> = memo(({ children, text, noOfLines = 3, color, ...props }) => {
    const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext);
    const [linesLenght, setLinesLength] = React.useState(0);
    const [shownLength, setShownLength] = React.useState(noOfLines);

    const [more, setMore] = React.useState(false);
    CustomUseEffect(() => {
        if (more) {
            setShownLength(0)
        } else {
            setShownLength(noOfLines)
        }
    }, [more])
    return (
        <>
            <Text
                numberOfLines={shownLength}
                ellipsizeMode={'tail'}
                onTextLayout={(event) => {
                    const { lines } = event.nativeEvent;
                    setLinesLength(lines?.length ?? 0)
                }}
                {...props}
            >
                {children}
            </Text>
            {linesLenght > noOfLines &&
                <>
                    <TouchableOpacity onPress={() => setMore(!more)}>
                        <Text style={{ ...styles.readMore, color: colors.themeBlueGrad1 }}>{more ? 'Read Less' : 'Read More'}</Text>
                    </TouchableOpacity>
                </>
            }
        </>
    );
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
        fontFamily: fontFamily.Inter_variable,
    },
    readMore: {
        color: 'red',
        fontSize: textScale(13),
        fontFamily: fontFamily.Inter_variable,
        includeFontPadding: false, alignSelf: 'flex-end'
    },
});

//make this component available to the app
export default React.memo(ReadMore_Text);