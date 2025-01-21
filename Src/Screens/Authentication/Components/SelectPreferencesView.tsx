
import React, { FC, useCallback, useState } from 'react';
import { FlatList, Modal, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { goBack, pushTo } from '../../../Navigations/NavigationService';
import { getStyles } from '../../../CommonStyles';
import { ThemeContext } from '../../../Providers/ThemeProvider';
import ImageHelper from '../../../Assets/Gallery/ImageHelper';
import Touchable from '../../../Components/Touchable';
import Text_N from '../../../Components/TextComponents/Text_N';
import CustomScrollView from '../../../Components/CustomScrollView';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { moderateScaleVertical } from '../../../CommonStyles/responsiveSize';
import CustomBorderButton from '../../../Components/CustomBorderButton';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
// import CustomDropDownPicker from '../../../Components/CustomDropDownPicker';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from '../../../Components/SearchableDropdown';


// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props extends ViewStyle {
    onPressNext: () => void

}
const SelectPreferencesView: FC<Props> = ({ ...props }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)

    const themeTypes = [{ label: 'light', value: 'light' },
    { label: 'dark', value: 'dark' },
    { label: 'default', value: 'default' },]

    const [preferOpen, setPreferOpen] = useState(false);
    const [preferItems, setPreferItems] = useState(themeTypes);
    const [selectedPrefers, setSelectedPrefers] = useState([]);

    const onSelectProgramType = useCallback((item) => {


    }, []);
    const ItemArr = ['Healthcare', 'Beauty', 'Fashion', 'Travel', 'Food', 'Fitness', 'Lifestyle', 'Technology', 'Entertainment', 'Sports', 'Education', 'Finance', 'Automobile', 'Real Estate', 'Others']

    const onRemoveItem = (item: string) => {

        setSelectedPrefers(pre => {
            if (pre.includes(item)) {
                return pre.filter(ele => ele !== item)
            } else {
                return pre
            }

        })
    }

    const renderChip = ({ item }) => {
        return (
            <View style={{
                ...comnViewStyles.rowContainer_A_C,
                gap: moderateScale(4),
                borderColor: colors.border_action,
                borderWidth: 1,
                borderRadius: 100,
                paddingLeft: moderateScale(10),
                paddingRight: moderateScale(8),
                paddingVertical: moderateScaleVertical(3)
            }}>

                <Text_N style={{ ...textStyles.actn_medium, color: colors.txt_action }}>{item?.title ?? 'All'}</Text_N>

                <Touchable
                    onPress={() => { onRemoveItem(item?.title) }}
                    style={{ padding: 0 }}>
                    <ImageHelper.svgs.Cross_heavy />
                </Touchable>
            </View>
        )

    }

    const onSelectItem = (item: string) => {

        setSelectedPrefers(pre => {
            if (pre.includes(item)) {
                return pre.filter(ele => ele !== item)
            } else {
                return [...pre, item]
            }

        })
    }

    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (

        <View>
            <CustomScrollView
                contentContainerStyle={{ paddingHorizontal: moderateScale(16) }}
            >
                {/* <View style={{
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    paddingVertical: moderateVerticalScale(0),
                    paddingTop: moderateVerticalScale(10),
                }}>
                    <BackButton />
                </View> */}
                <View style={{ gap: moderateScaleVertical(20), paddingRight: moderateScale(20) }}>
                    <Text_N style={{ ...textStyles.heading_large, marginTop: moderateScaleVertical(0) }}>{lang.Select_Preferences}</Text_N>
                    <Text_N style={{
                        ...textStyles.body_medium,
                        marginTop: moderateScaleVertical(0),
                        letterSpacing: 0.5
                    }}>{lang.Select_the_industry_or_sector_By_influencer}</Text_N>

                </View>
                <View style={{ gap: moderateScaleVertical(40), marginTop: moderateVerticalScale(20) }}>
                    <View style={{ gap: moderateScaleVertical(14) }}>

                        {/* <DropDownPicker
                            searchable
                            items={preferItems}
                            open={preferOpen}
                            value={selectedPrefers}
                            setValue={setSelectedPrefers}
                            setOpen={setPreferOpen}
                            setItems={setPreferItems}
                        // multiple

                        /> */}

                        <SearchableDropdown
                            options={ItemArr}
                            onOptionSelected={onSelectItem}
                        />
                        {selectedPrefers.length > 0 ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: moderateScale(5), flex: 1, }}>
                                {selectedPrefers?.map(ele => renderChip({ item: { title: ele } }))}
                            </View>
                            :
                            <>
                                <View style={{ paddingVertical: moderateScaleVertical(10), alignItems: 'center', justifyContent: 'center' }}>
                                    <Text_N style={{ ...textStyles.title_small, marginTop: moderateScaleVertical(0), textAlign: 'center', }}>{'Please select prefererd industries'}</Text_N>
                                </View>
                            </>
                        }


                    </View>
                    <CustomButton
                        title={lang.Next}
                        rederRight={() => <ImageHelper.svgs.Angle_left style={{ color: colors.bg_primary }} rotation={180} />}
                        onPress={props.onPressNext}
                    />
                </View>
            </CustomScrollView>
        </View>
    );
};

export default React.memo(SelectPreferencesView);
