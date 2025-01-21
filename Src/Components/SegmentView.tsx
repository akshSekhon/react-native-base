import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, useColorScheme, TouchableOpacity, ViewProps, ViewStyle, TextInput, TextStyle, LayoutChangeEvent } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { ThemeContext } from '../Providers/ThemeProvider';
import { getStyles } from '../CommonStyles';
import { moderateScale, moderateScaleVertical } from '../CommonStyles/responsiveSize';
import Text_N from './TextComponents/Text_N';
import { fontFamily } from '../Assets/Fonts/FontFamily';




const TAB_WIDTH = 0;
interface TabItem {
    id: number | string;
    title: string;
}

interface Props {
    containerStyle?: ViewStyle;
    onSelectItem?: (tab: TabItem) => void;
    tabItems: TabItem[];
    tabStyle?: ViewStyle;
    titleStyle?: TextStyle;
    defaultSelected?: TabItem;
}

const SegmentView: React.FC<Props> = ({ containerStyle, onSelectItem, tabItems, tabStyle, titleStyle, defaultSelected }) => {

    const { colors, textStyles } = getStyles(ThemeContext); // Assuming you have ThemeContext
    const [selectedTab, setSelectedTab] = useState<TabItem | undefined>(defaultSelected);
    const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);


    const offset = useSharedValue(0);
    const width = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(offset.value, { duration: 200 }) }],
        width: withTiming(width.value, { duration: 100 }),
    }));

    useEffect(() => {
        const copmareWith = selectedTab ? selectedTab : defaultSelected
        if (copmareWith) {
            const defaultIndex = tabItems.findIndex((tab) => tab?.id === copmareWith?.id);
            if (defaultIndex !== -1 && tabLayouts[defaultIndex]) {
                offset.value = tabLayouts[defaultIndex].x;
                width.value = tabLayouts[defaultIndex].width;
            }
        }
    }, [defaultSelected, tabLayouts, tabItems, selectedTab]);

    const handlePress = (tab: TabItem, index: number) => {
        setSelectedTab(tab);

        const tabLayout = tabLayouts[index];
        if (tabLayout) {
            offset.value = tabLayout.x;
            width.value = tabLayout.width;
        }

        if (onSelectItem) {
            onSelectItem(tab);
        }
    };

    const handleLayout = (event: LayoutChangeEvent, index: number) => {
        const { x, width } = event.nativeEvent.layout;
        setTabLayouts((prevLayouts) => {
            const updatedLayouts = [...prevLayouts];
            updatedLayouts[index] = { x, width };
            return updatedLayouts;
        });
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.tabContainer}>
                {tabItems.map((tab, index) => (
                    <TouchableOpacity
                        key={tab.id}
                        activeOpacity={0.9}
                        style={[
                            styles.tab,
                            tabStyle,
                            {
                                backgroundColor: tab.id === selectedTab?.id ? 'transparent' : 'transparent', // Replace with your colors
                            },
                        ]}
                        onPress={() => handlePress(tab, index)}
                        onLayout={(event) => handleLayout(event, index)}
                    >

                        <Text
                            style={[
                                textStyles.actn_medium_heavy,
                                titleStyle,
                                {
                                    color: tab.id === selectedTab?.id ? colors.bg_action : colors.txt_disable,
                                    fontFamily: fontFamily.Inter_Bold_18
                                },
                            ]}
                        >
                            {tab.title}
                        </Text>

                    </TouchableOpacity>
                ))}

                <Animated.View style={[styles.animatedBorder, animatedStyles]} >
                    <View style={{ flex: 1, width: '75%', backgroundColor: colors.bg_action, borderRadius: 10 }}>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

export default SegmentView;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    tabContainer: {
        gap: moderateScale(10),
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
    },
    tab: {
        // paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    animatedBorder: {
        position: 'absolute',
        bottom: 0,
        height: 4,
        alignItems: 'center',
        borderRadius: 2,
    },
});
// export default SegmentView