import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SVGComponent } from '../../Assets/Types.tsx';
import { getStyles } from '../../CommonStyles';
import { moderateScale, moderateScaleVertical, scale, verticMutipier } from '../../CommonStyles/responsiveSize';
import { ThemeContext } from '../../Providers/ThemeProvider';
import Text_N from '../TextComponents/Text_N.tsx';
interface props {
  // color?: string;
  onPress?: () => void,
  Icon: SVGComponent,
  name?: string,
  selectedIcon?: SVGComponent,
  activeTabCheck?: any,
  isFocused?: boolean,
  index?: number,
  containerStyle?: ViewStyle,
}

const CustomTab: FC<props> = ({
  onPress,
  Icon,
  name,
  containerStyle,
  index,
  isFocused
}) => {
  const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      style={[styles.container,
      { backgroundColor: isFocused ? colors.transparent : colors.transparent }, containerStyle]}
      onPress={onPress}>
      <View
        style={{
        }}>

        <View style={{
          alignItems: 'center',
          paddingVertical: verticMutipier(0),
          gap: moderateScaleVertical(0),
        }}>
          {Icon &&

            <Icon height={scale(28)} width={scale(24)} style={{ color: isFocused ? colors.txt_action : colors.txt_black }} />
          }
          <Text_N numberOfLines={1} style={{
            ...textStyles.actn_small,
            ...styles.tabText,
            color: isFocused ? colors.txt_action : colors.transparent
          }}>{name}</Text_N>

        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
  },
  selectedTabContainer: {
    backgroundColor: 'white',
  },

  tabIconStyle: {
    alignSelf: 'center',
    height: scale(22),
    width: scale(22),
    // resizeMode: ImageEnum.contain,
  },
  tabText: {
    // fontSize: textScale(11),
    textAlign: 'center',
  },
  tabBarLabelStyle: {
    marginTop: moderateScale(4),
    justifyContent: 'center',
  },
});

export default CustomTab;
