import { useContext } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { fontFamily } from "../Assets/Fonts/FontFamily";
import { ThemeContext } from "../Providers/ThemeProvider";
import { textScale } from "./responsiveSize";

export const baseTextStyle: TextStyle = { fontFamily: fontFamily.Inter_variable, includeFontPadding: false }
const styles = StyleSheet.create({
    sz48_wt700: {
        ...baseTextStyle,
        fontSize: textScale(42),
        fontWeight: '700'

    },
    sz32_wt800: {
        ...baseTextStyle,
        fontSize: textScale(28),
        // fontWeight: '800',
        fontFamily: fontFamily.Inter_Bold_18
    },
    sz24_wt800: {
        ...baseTextStyle,
        fontSize: textScale(24),
        // fontWeight: '800',
        fontFamily: fontFamily.Inter_Bold_18
    },
    sz16_wt600: {
        ...baseTextStyle,
        fontSize: textScale(16),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_SemiBold_18
    },
    sz24_wt600: {
        ...baseTextStyle,
        fontSize: textScale(24),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_Bold_18
    },
    sz17_wt800: {
        ...baseTextStyle,
        fontSize: textScale(17),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_Bold_18
    },
    sz14_wt400: {
        ...baseTextStyle,
        fontSize: textScale(14),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_Medium_18
    },
    sz12_wt600: {
        ...baseTextStyle,
        fontSize: textScale(12),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_SemiBold_18
    },
    sz10_wt400: {
        ...baseTextStyle,
        fontSize: textScale(10),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_Light_18
    },
    sz12_wt400: {
        ...baseTextStyle,
        fontSize: textScale(12),
        fontFamily: fontFamily.Inter_Light_18
    },
    sz14_wt600: {
        ...baseTextStyle,
        fontSize: textScale(14),
        // fontWeight: '600',
        fontFamily: fontFamily.Inter_SemiBold_18
    },
})

export const getTextStyles = (context: typeof ThemeContext) => {
    const { colors } = useContext(context);
    return StyleSheet.create({
        logoTitle: {
            ...styles.sz48_wt700,
            color: colors.txt_white,
        },
        disp_med: {
            ...styles.sz48_wt700,
            color: colors.txt_heading,
        },
        heading_large: {
            ...styles.sz32_wt800,
            color: colors.txt_heading,
        },
        heading_medium: {
            ...styles.sz24_wt800,
            color: colors.txt_heading,
        },
        title_small: {
            ...styles.sz16_wt600,
            color: colors.txt_heading,
        },
        title_large: {
            ...styles.sz24_wt600,
            color: colors.txt_heading,
        },
        actn_large: {
            ...styles.sz16_wt600,
            color: colors.txt_black,
        },
        actn_medium: {
            ...styles.sz14_wt600,
            color: colors.txt_black,
        },
        actn_medium_heavy: {
            ...styles.sz14_wt600,
            color: colors.txt_black,
        },

        actn_small: {
            ...styles.sz12_wt600,
            color: colors.txt_black,
        },
        lbl_small: {
            ...styles.sz10_wt400,
            color: colors.txt_body,
        },
        lbl_medium: {
            ...styles.sz12_wt400,
            color: colors.txt_body,
        },
        body_small: {
            ...styles.sz12_wt400,
            color: colors.txt_body,
        },
        body_ExSmall: {
            ...styles.sz10_wt400,
            color: colors.txt_body,
        },
        body_medium: {
            ...styles.sz14_wt400,
            color: colors.txt_black,
        },
        error_text: {
            ...styles.sz10_wt400,
            color: colors.txt_danger,
        }

    });
};
