
import { Platform, StyleSheet, ViewStyle } from "react-native"
import { fontFamily } from "../Assets/Fonts/FontFamily"
import { moderateScale, moderateScaleVertical, scale, textScale, verticMutipier } from "./responsiveSize"
import { FC, useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";

export const getComnViewStyles = (context: typeof ThemeContext) => {
    // const colors = use(colorScheme)
    const { lang, colors } = useContext(context);
    // export const comnViewStyles = StyleSheet.create({
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        hzPadContainer: {
            paddingHorizontal: moderateScale(16),
        },
        rowContainerSB: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        rowContainer_A_C: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: moderateScale(0),
        },
        loader: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            borderRadius: 10,
            // height: moderateScaleVertical(45),
            // justifyContent: 'center', alignItems: 'center',
            // overflow: 'hidden',
        },
        textfieldContainer: {
            backgroundColor: colors.bg_primary,
            flexDirection: "row",
            borderColor: colors.border_prim,
            borderWidth: 1,
            paddingHorizontal: moderateScale(10),
            paddingBottom: moderateScaleVertical(1),
            borderRadius: 6,
            height: moderateScaleVertical(40),
            alignItems: "center",
        },
        searchContainer: {
            backgroundColor: colors.bg_primary,
            flexDirection: "row",
            borderColor: colors.border_prim,
            borderWidth: 1,
            borderRadius: 6,
            height: moderateScaleVertical(40),
            maxHeight: moderateScaleVertical(50),
            paddingHorizontal: moderateScale(10),
            paddingBottom: moderateScaleVertical(0),
            alignItems: "center",
        },

        textInputImg: {
            borderRadius: 0, alignSelf: 'center',
            resizeMode: 'contain',
            height: scale(20),
            width: scale(20)
        },
        textInput: {
            flex: 1,
            paddingHorizontal: moderateScale(8),
            color: colors.txt_black,
            includeFontPadding: false,
            textAlignVertical: 'center',
        }

    })
}

interface ShadowProps {
    shadowColor?: string,
    shadowOpacity?: number
    shadowRadius?: number
    elevation?: number,
    offWidth?: number,
    offHeight?: number,


}
export const shadowBox = ({
    shadowColor = "#000000",
    shadowOpacity = 0.20,
    shadowRadius = 5.62,
    elevation = 8,
    offHeight = 6,
    offWidth = 0

}: ShadowProps) => {
    // const box = StyleSheet.create({
    const box = {
        shadowColor: shadowColor,
        shadowOffset: {
            width: offWidth,
            height: offHeight,
        },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
        elevation: elevation,
    }
    // })
    return box
}
