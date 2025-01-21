import MaskedView from "@react-native-masked-view/masked-view";
import React, { FC, memo } from "react";
import { StyleSheet, Text, TextProps, TouchableHighlight, useColorScheme } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { ThemeContext } from "../../Providers/ThemeProvider";
import { getStyles } from "../../CommonStyles";

import { fontFamily } from "../../Assets/Fonts/FontFamily";
import { textScale } from "../../CommonStyles/responsiveSize";
// import {colors} from '../styles/StyleIndex';

interface Props extends TextProps {
  colorArr?: string[],
  onPress?: () => void,
  rest?: any,
}

const GradientText: FC<Props> = ({ colorArr, onPress, ...rest }) => {
  const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext);
  if (!colorArr) {
    colorArr = [colors.themeBlue, colors.themeBlueGrad1]
  }

  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <TouchableHighlight onPress={onPress}>
        <LinearGradient
          colors={colorArr}
          // locations={[0, 0.5]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text {...rest} style={[styles.text, rest?.style, { opacity: 0 }]} />
        </LinearGradient>
      </TouchableHighlight>
    </MaskedView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  text: {
    includeFontPadding: false,
    color: 'red',
    fontSize: textScale(14),
    fontFamily: fontFamily.Inter_variable,
    // textAlign: 'center',
  },
});

export default React.memo(GradientText);
