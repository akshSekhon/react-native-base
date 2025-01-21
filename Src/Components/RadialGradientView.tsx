import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, {
    Defs,
    RadialGradient,
    Rect,
    Stop,
} from 'react-native-svg';
// import {Color} from './types';
export interface RadialColor {
    offset?: string;
    color: string;
    opacity?: string;
}
interface RadialProps {
    x: string;
    y: string;
    rx: string;
    ry: string
    colorList: RadialColor[];

}

interface Props {
    readonly children?: React.ReactNode
    style?: ViewStyle
    radialValues: RadialProps,
}

export const RadialGradientView: FC<Props> = ({ children, radialValues: { colorList, x, y, rx, ry, }, ...props }) => {
    return (
        <View style={[styles.container, props?.style]}>
            <View style={StyleSheet.absoluteFill}>
                <Svg height="100%" width="100%" >
                    <Defs >
                        <RadialGradient
                            id="grad"
                            cx={x}
                            cy={y}
                            rx={rx}
                            ry={ry}
                            gradientUnits="userSpaceOnUse"
                        >
                            {colorList.map((value, index) => (
                                <Stop
                                    key={`RadialGradientItem_${index}`}
                                    offset={value.offset}
                                    stopColor={value.color}
                                    stopOpacity={value.opacity}
                                />
                            ))}
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
                </Svg>
            </View>
            {children}
        </View>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'

    },
    content: {
        flex: 1,
        // backgroundColor:'red'
    },
    imageStyle: {
        // flex: 1,
    },
});