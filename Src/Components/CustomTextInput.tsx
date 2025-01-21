//import liraries
import React, { FC, useState } from "react";
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
  ViewStyle
} from "react-native";

import { moderateScale, scale } from 'react-native-size-matters';
import { fontFamily } from "../Assets/Fonts/FontFamily.tsx";
import ImageHelper from "../Assets/Gallery/ImageHelper.tsx";
import { getStyles } from '../CommonStyles';
import { moderateScaleVertical, textScale } from '../CommonStyles/responsiveSize.tsx';
import { ThemeContext } from '../Providers/ThemeProvider.tsx';
import Text_N from "./TextComponents/Text_N.tsx";

// create a component
interface Props {
  textStyle?: TextStyle
  containerStyle?: ViewStyle
  innerContainerStyle?: ViewStyle
  placeholder?: string
  value?: any
  maxLength?: number
  defaultSecure?: boolean
  leftImage?: any
  keyboardType?: KeyboardType
  returnKeyType?: ReturnKeyType
  imageEyeOpen?: boolean
  imageEyeClose?: string
  isshowLeftImg?: boolean
  required?: boolean
  isTogleSecure?: boolean
  isAutoFocus?: boolean
  editable?: boolean
  isShowRightImage?: boolean
  rightImage?: string
  rightImageAction?: any
  rightText?: string
  rightTextStyle?: TextStyle
  rigthTextContainerStyle?: ViewStyle
  rigthImageContainerStyle?: any
  rightImageStyle?: any
  leftText?: any
  leftTextStyle?: TextStyle
  secureTextEntry?: boolean
  hederText?: string
  headerTextStyle?: TextStyle
  helperText?: string
  errorText?: string
  helperTextStyle?: TextStyle
  onPressRigthBtn?: any
  multiline?: any
  textInputRef?: any
  showFlag?: any
  onBlur?: any,
  onFocus?: any,
  onChangeText?: any,
  onPress?: any,
  renderRightImage?: React.ReactNode
  // renderLeftImage?: React.ReactNode

}

const CustomTextInput: FC<Props> = ({
  textStyle,
  containerStyle,
  innerContainerStyle,
  placeholder,
  isAutoFocus = false,
  value,
  maxLength,
  defaultSecure = true,
  required = true,
  onChangeText = () => { },
  leftImage,
  keyboardType,
  returnKeyType = "done",
  imageEyeOpen = null,//ImageHelper.png.eyeOpen,
  imageEyeClose = null,//ImageHelper.png.eyeClose,
  isshowLeftImg = false,
  isTogleSecure = true,
  editable = true,
  isShowRightImage = false,
  rightImage,
  rightImageAction,
  rightText,
  rightTextStyle,
  rigthTextContainerStyle,
  rigthImageContainerStyle,
  rightImageStyle,
  leftText,
  leftTextStyle,
  onBlur = () => { },
  onFocus = () => { },
  secureTextEntry,
  hederText,
  headerTextStyle,
  helperText,
  errorText,
  helperTextStyle,
  onPressRigthBtn,
  multiline,
  textInputRef,
  showFlag,
  onPress
}) => {
  const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)

  const secure = secureTextEntry && defaultSecure === true;
  // const appData = useSelector(state => state?.appSettings?.appData)
  // const langData = appData?.selectedLanguage
  const [secured, setSecured] = useState(secureTextEntry);

  const RequireTag = () => (
    <>
      {required ?
        <Text_N
          style={{
            ...textStyles.actn_large,
            fontSize: textScale(14),
            color: colors.txt_danger,
          }}>
          {"*"}
        </Text_N> : null
      }
    </>

  )


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{ ...styles.container, ...containerStyle }}>
      {hederText && (
        <Text_N
          style={{
            ...textStyles.lbl_medium,
            // fontSize: textScale(13),
            // fontFamily:fontFamily.quicksand_Medium,
            // color: colors.textWhite,
            marginBottom: moderateScaleVertical(5),
            ...headerTextStyle,
          }}
        >
          <RequireTag />
          {""}
          {hederText}{" "}
        </Text_N>
      )}

      {/* <View> */}

      <View
        style={{
          ...comnViewStyles.rowContainerSB,
          ...comnViewStyles.textfieldContainer,

          ...innerContainerStyle,
        }}
      >
        {/* {showFlag && <CountryFlag isoCode={showFlag} size={16} />} */}
        {isshowLeftImg && (
          <>
            {
              (typeof leftImage == 'string') ?
                <Image
                  style={comnViewStyles.textInputImg}
                  source={leftImage}
                />
                :
                <>{leftImage && leftImage}</>
            }
          </>
        )}
        {leftText && (
          <View style={{ paddingLeft: moderateScale(8), marginBottom: 0 }}>
            <Text
              style={{
                ...textStyles.lbl_medium,
                // textAlignVertical: "top",
              }}
            >
              {leftText}
            </Text>
          </View>
        )}
        {secureTextEntry ? (
          <TextInput
            style={{ ...comnViewStyles.textInput, ...textStyles.body_medium, ...textStyle }}
            maxLength={maxLength}
            placeholder={placeholder}
            autoFocus={isAutoFocus}
            value={value}
            placeholderTextColor={colors.txt_disable}
            returnKeyType={returnKeyType}
            secureTextEntry={secured}
            onChangeText={onChangeText}
            editable={editable}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={multiline}
            ref={textInputRef}
            keyboardType={keyboardType}
          // selectTextOnFocus={true}
          />
        ) : (
          <TextInput
            style={{
              ...comnViewStyles.textInput,
              ...textStyle,
              height: "100%",
            }}
            maxLength={maxLength}
            placeholder={placeholder}
            autoFocus={isAutoFocus}
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
        )}

        {secureTextEntry === true && (
          <TouchableOpacity
            style={{
              marginEnd: -5,
              width: 30,
              height: "75%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setSecured(!secured);
              console.log("secured=====", secured);
            }}
          >
            {isTogleSecure && (
              <>
                {
                  !secured ?
                    <>
                      <ImageHelper.svgs.Eye_open style={{ color: colors.bg_action }} />
                    </> :
                    <>
                      <ImageHelper.svgs.Eye_open style={{ color: colors.icon_black }} />
                    </>
                }
              </>
              // <Image
              //   style={{ ...comnViewStyles.textInputImg ,tintColor:'white'}}
              //   source={!secured ? imageEyeOpen : imageEyeClose}
              // />
            )}
          </TouchableOpacity>
        )}
        {rightText && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: moderateScaleVertical(2),
              ...rigthTextContainerStyle,
            }}
            onPress={onPressRigthBtn}
          >
            <Text
              style={{
                ...textStyles.lbl_medium,
                // ...textStyles.fontSize15,
                // color: colors.themeGradSec,
                ...rightTextStyle,
              }}
            >
              {rightText}
            </Text>
          </TouchableOpacity>
        )}
        {isShowRightImage && (
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: moderateScaleVertical(4),
              ...rigthImageContainerStyle,
            }}
            onPress={rightImageAction}
          >
            <Image
              style={{ ...comnViewStyles.textInputImg, ...rightImageStyle }}
              source={rightImage}
            ></Image>
          </TouchableOpacity>
        )}
      </View>

      {/* 
      </View> */}
      {(errorText || helperText) && (
        <View style={{ marginTop: moderateScale(4) }}>
          {errorText && (
            <Text_N
              style={{
                ...textStyles.error_text,
                ...helperTextStyle,
              }}
            >
              {" "}
              {errorText}{" "}
            </Text_N>
            // </View>
          )}

          {helperText && (
            <Text
              style={{
                ...textStyles.error_text,
                color: colors.txt_success,
                ...helperTextStyle,
              }}
            >
              {" "}
              {helperText}{" "}
            </Text>
          )}
        </View>
      )}
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
export default CustomTextInput;
