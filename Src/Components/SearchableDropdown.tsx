import React, { FC, useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
// import { getStyles } from '../HelperFiles/HelperFunction';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import Text_N from './TextComponents/Text_N';
import ImageHelper from '../Assets/Gallery/ImageHelper';
import Touchable from './Touchable';
import { goBack } from '../Navigations/NavigationService';
import SearchBar from './SearchBar';
import { FlatList } from 'react-native-gesture-handler';



// import CommonStyles from '../Styles/CommonStyles';
// import colors from '../styles/colors';

interface Props {
    options: string
    onOptionSelected: (any: string) => void,
}
const SearchableDropdown: FC<Props> = ({ options, onOptionSelected = () => { } }) => {
    const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
    const [searchText, setSearchText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        setFilteredOptions(options)
    }, [options])

    const filterOptions = (text) => {
        setSearchText(text);
        // if (options.length <= 0) {
        //     return
        // }
        setFilteredOptions(
            options?.filter((option) =>
                option?.toLowerCase().includes(text.toLowerCase())
            )
        );
        setShowOptions(true);
    };

    const onOptionPress = (option) => {
        setSearchText('');
        onOptionSelected(option);
        setShowOptions(false);
    };
    // const comnViewStyles = getComnViewStyles(ThemeContext)
    return (
        <View>

            <SearchBar
                // value={searchProps?.value}
                // onChangeText={searchProps?.onChangeText}
                value={searchText}
                onFocus={() => setShowOptions(true)}
                onChangeText={filterOptions}
                renderLeft={<ImageHelper.svgs.Search />}
                renderRight={<ImageHelper.svgs.Angle_left rotation={-90} />}
                placeholder={lang.Search_for_preferences}
            />

            {showOptions && (
                <FlatList
                    data={filteredOptions}
                    // contentContainerStyle={{ height: 150 }}
                    nestedScrollEnabled
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onOptionPress(item)}
                            style={{ height: 30 }}
                        >
                            <Text_N>{item}</Text_N>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            )}
        </View>
    );
};

export default React.memo(SearchableDropdown);
