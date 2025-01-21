//import liraries
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

// create a component
interface props extends TouchableOpacityProps {
    children?: any
    slopArea?: number
}
const Touchable: FC<props> = ({ children, slopArea, style, ...props }) => {
    return (
        <TouchableOpacity

            activeOpacity={1}
            hitSlop={{ top: slopArea ?? 3, bottom: slopArea ?? 3, left: slopArea ?? 3, right: slopArea ?? 3 }}
            style={[styles.container, style]}
            {...props}

        >
            {children}
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default Touchable;