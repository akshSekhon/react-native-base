//import liraries
import React, { FC, useRef, useState } from "react";
import {
    Image,
    KeyboardType,
    ReturnKeyType,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
    useColorScheme,
} from "react-native";
// import ImageHelper from "../../Assets/Gallery/ImageHelper";
// import { getStyles } from "../../CommonStyles";
// import { ThemeContext } from "../../Providers/ThemeProvider.tsx";
// import { moderateScale, moderateScaleVertical } from "../../CommonStyles/responsiveSize";
// import Text_N from "../TextComponents/Text_N.tsx";

import { moderateScale, scale } from 'react-native-size-matters';
import { fontFamily } from "../Assets/Fonts/FontFamily.tsx";
import ImageHelper from "../Assets/Gallery/ImageHelper.tsx";
import { getStyles } from '../CommonStyles';
import { moderateScaleVertical, textScale } from '../CommonStyles/responsiveSize.tsx';
import { ThemeContext } from '../Providers/ThemeProvider.tsx';
import Text_N from "./TextComponents/Text_N.tsx";

// import ComponentStyles from "../styles/ComponentStyles";

// import { moderateScale, moderateScaleVertical } from "../Styles/responsiveSize";

// import ImageHelper from "../Assets/Images/ImageHelper";
// import { getStyles } from "../HelperFiles/HelperFunction";
// import { useSelector } from "../redux/hooks";

// create a component
interface Props {
    textStyle?: TextStyle
    containerStyle?: ViewStyle
    innerContainerStyle?: ViewStyle
    placeholder?: string
    value?: string
    maxLength?: number
    keyboardType?: KeyboardType
    returnKeyType?: ReturnKeyType
    renderLeft?: any
    renderRight?: any
    // isshowLeftImg?: boolean
    editable?: boolean

    // leftText?: any
    secureTextEntry?: boolean
    hederText?: string
    headerTextStyle?: TextStyle

    multiline?: boolean
    textInputRef?: any
    onBlur?: () => void,
    onFocus?: () => void,
    onChangeText?: (txt: string) => void,
    onPress?: () => void,
}

const SearchBar: FC<Props> = ({
    textStyle,
    containerStyle,
    innerContainerStyle,
    placeholder,
    value,
    maxLength,
    onChangeText = () => { },
    keyboardType,
    renderLeft,
    returnKeyType = "done",
    renderRight,
    editable = true,
    onBlur = () => { },
    onFocus = () => { },
    secureTextEntry,
    hederText,
    headerTextStyle,
    multiline,
    textInputRef,
    onPress
}) => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)

    // const appData = useSelector(state => state?.appSettings?.appData)
    // const langData = appData?.selectedLanguage
    const [secured, setSecured] = useState(secureTextEntry);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={{ ...styles.container, ...containerStyle }}>
            {hederText && (
                <Text
                    style={{
                        ...textStyles.lbl_medium,

                        marginBottom: moderateScale(5),
                        ...headerTextStyle,
                    }}
                >
                    {" "}
                    {hederText}{" "}
                </Text>
            )}

            {/* <View> */}

            <View
                style={{
                    ...comnViewStyles.searchContainer,
                    ...innerContainerStyle,
                }}
            >
                {renderLeft && (
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: moderateScaleVertical(0) }}>
                        {renderLeft}
                    </View>
                )}
                <TextInput
                    style={{ ...comnViewStyles.textInput, ...textStyles.body_medium, ...textStyle }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    value={value}
                    placeholderTextColor={colors.txt_disable}
                    keyboardType={keyboardType}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secured}
                    onChangeText={onChangeText}
                    editable={editable}
                    onFocus={onFocus}

                    onBlur={onBlur}
                    multiline={multiline}
                    ref={textInputRef}
                    textAlignVertical={multiline ? "top" : "center"}
                // selectTextOnFocus={true}
                />
                {renderRight &&

                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: moderateScaleVertical(0) }}>
                        {renderRight}
                    </View>
                }
            </View>

        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        // marginHorizontal: 15,
    },
});

//make this component available to the app
export default SearchBar;
