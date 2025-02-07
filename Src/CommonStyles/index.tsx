import { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider"
import { getTextStyles } from "./CommonTextStyles"
import { getComnViewStyles } from "./CommonViewStyles"

export const getStyles = (context: typeof ThemeContext) => {

    const { colors, lang } = useContext(context);
    const textStyles = getTextStyles(context)
    const comnViewStyles = getComnViewStyles(context)

    type StyleFilesType = {
        lang: typeof lang
        colors: typeof colors,
        textStyles: typeof textStyles,
        comnViewStyles: typeof comnViewStyles
    }
    const styles: StyleFilesType = { lang, colors, textStyles, comnViewStyles }
    return styles
}


export const useStyles = () => {
    try {
        return getStyles(ThemeContext)
    } catch (error) {
        throw new Error(
            "getStyles must be used within a React component that is wrapped in ThemeProvider."
        );
    }
};