import React, { FC } from 'react';
import { StyleSheet, useColorScheme, ViewStyle } from 'react-native';




// import { getStyles } from '../HelperFiles/HelperFunction';
// import fontFamily from '../Styles/fontFamily';
// import { textScale } from '../Styles/responsiveSize';
import DropDownPicker, { ListModeType, ModeType } from 'react-native-dropdown-picker';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { textScale } from '../CommonStyles/responsiveSize';

interface Props {
    placeholder: string,
    open: boolean,
    value?: any,
    items?: Array<object>,
    setOpen?: any,
    setValue?: any,
    setItems?: any,
    style?: object,
    onChangeItem?: any,
    containerStyle?: ViewStyle,
    dropDownStyle?: object,
    mode?: ModeType,
    isMultiple?: boolean | false,
    searchable?: boolean | false,
    listMode: ListModeType
    showArrowIcon?: boolean | false,
    rtl?: boolean,
}

const CustomDropDownPicker: FC<Props> = ({
    placeholder,
    open,
    value,
    items,
    setOpen,
    setValue,
    setItems,
    style,
    onChangeItem,
    containerStyle,
    mode,
    isMultiple,
    searchable,
    listMode,
    showArrowIcon = true,
    rtl = false,
    dropDownStyle = { elevation: 4 },

}) => {
    const colorScheme = useColorScheme()
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    return (
        <DropDownPicker
            textStyle={{ ...comnViewStyles.textInput }}
            style={{ ...styles.droperStyle, ...style }}
            zIndex={5000}
            containerStyle={{ ...styles.container, ...containerStyle }}
            placeholder={placeholder}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={searchable}
            mode={mode}
            listMode={listMode}
            autoScroll
            dropDownContainerStyle={{ backgroundColor: colors.bg_primary, borderColor: colors.bg_primary }}
            flatListProps={{ nestedScrollEnabled: true, scrollEnabled: true }}
            onSelectItem={onChangeItem}
            rtl={rtl}
            // multiple={isMultiple}
            multiple={isMultiple}
            badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            addCustomItem
            theme={colorScheme == 'light' ? 'LIGHT' : colorScheme == 'dark' ? 'DARK' : 'DEFAULT'}
            showArrowIcon={showArrowIcon}
        />
    );
};

export default CustomDropDownPicker
const styles = StyleSheet.create({
    droperStyle: {
        width: 150, height: 30, paddingVertical: 0, borderWidth: 0, minHeight: 0

    },
    container: {
        width: 150,
        // zIndex: 999
    },
    textStyle: {
        fontSize: textScale(14),
        // fontFamily: fontFamily.regular,

    },
});
