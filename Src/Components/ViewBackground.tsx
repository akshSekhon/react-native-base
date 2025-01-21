//import liraries
import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

// create a component


interface props {
    children?: React.ReactNode
    backgroundChildren?: React.ReactNode
    containderStyle?: ViewStyle,
    style?: ViewStyle,
    contentContainerStyle?: ViewStyle
    masterStyle?: ViewStyle

}
const ViewBackground: FC<props> = ({ children, backgroundChildren, ...props }) => {
    return (

        <View style={[styles.container, props?.masterStyle]}>
            <View style={StyleSheet.absoluteFill}>
                {backgroundChildren}
            </View>
            <View style={[styles.content, props.style]}>
                {children}
            </View>
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        // backgroundColor:'red'
    },
    imageStyle: {
        // flex: 1,
    },
});

//make this component available to the app
export default ViewBackground;