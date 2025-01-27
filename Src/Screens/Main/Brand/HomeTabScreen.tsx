import { useIsFocused } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { getStyles } from '../../../CommonStyles/index'
import { shadowBox } from '../../../CommonStyles/CommonViewStyles'
import { moderateScale, moderateScaleVertical } from '../../../CommonStyles/responsiveSize'
import { WishlistButton, RadialGradientView, WrapperContainer, CustomButton, TabbarHeader, LineView, LoaderImage, SegmentView, Text_N } from '../../../Components/index'
import { ThemeContext } from '../../../Providers/ThemeProvider'
import { useUser } from '../../../Providers/UserProvider'
import ProjectItemCard from '../SharedComponents/ProjectItemCard'
import ImageHelper from '../../../Assets/Gallery/ImageHelper'

const MakeConnectionsView = () => {
    const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext)
    const colorList = [
        { color: colors.themeBlue, },
        { offset: '100%', color: colors.themeBlueGrad1, }
    ]

    return (
        <RadialGradientView
            style={{
                borderRadius: 10,
                paddingTop: moderateScaleVertical(10),
                // height: moderateScaleVertical(400)
            }}
            radialValues={{ colorList, x: "50%", y: "50%", rx: "55%", ry: "55%" }}
        >
            <View style={{ gap: moderateScale(0) }}>
                <Text_N style={{ ...textStyles.title_large, color: colors.txt_white, textAlign: 'center' }}>
                    {lang.Make_Connections}
                </Text_N>
                <Text_N style={{ ...textStyles.title_small, color: colors.txt_white, textAlign: 'center' }}>
                    {lang.Get_recognized_and_build_your_community}
                </Text_N>
            </View>
            <View style={{ flex: 1, }}>
                <Image
                    source={ImageHelper.pngs.communityGroup}
                    style={{ alignSelf: 'center' }}
                    resizeMode='contain'
                />

                <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, paddingHorizontal: moderateScale(20) }}>
                    <CustomButton
                        bgColors={[colors.bg_primary, colors.bg_primary]}
                        titleStyle={{ color: colors.txt_action }}
                        title={lang.Go_to_Connections}
                    />
                </View>
            </View>

        </RadialGradientView>
    )
}




const HomeTabScreen: FC<any> = () => {
    const { lang, colors, textStyles, comnViewStyles } = getStyles(ThemeContext)
    const [selectedTab, setSelectedTab] = useState({ title: lang.Best_Matches, id: 0 })
    const isFocused = useIsFocused()
    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.appBg, 'light', 'navigation')
    }, [isFocused]);

    const brandsList = [
        { id: 0, icon: ImageHelper.temp.manMatters, image: ImageHelper.temp.product1 },
        { id: 1, icon: ImageHelper.temp.nykaa, image: ImageHelper.temp.product2 },
        { id: 2, icon: ImageHelper.temp.veet, image: ImageHelper.temp.product3 },
        { id: 3, icon: ImageHelper.temp.beardo, image: ImageHelper.temp.product4 },
        { id: 4, icon: ImageHelper.temp.villain, image: ImageHelper.temp.product5 },
    ]

    const { profileType } = useUser()
    console.log('profileType Brand is :----', profileType);

    const brandItem = ({ item }) => {
        return (
            <View>
                <View style={{
                    ...shadowBox({}),
                    height: 120,
                    width: 100,
                    borderRadius: 5,
                    backgroundColor: colors.appBg,
                    paddingBottom: moderateScaleVertical(5),
                    overflow: 'hidden'
                }}>

                    <LoaderImage
                        uri={item?.image}
                        resizeMode='cover'
                        style={{ flex: 1, }}
                    />

                    <LoaderImage
                        uri={item?.icon}
                        style={{ height: moderateScale(25) }}
                    />
                </View>
            </View>
        )
    }

    const BrandListView = () => {
        return (
            <View>
                <FlatList
                    horizontal
                    data={brandsList}
                    contentContainerStyle={{
                        paddingVertical: moderateScaleVertical(14),
                        gap: moderateScale(10),
                        paddingHorizontal: moderateScale(10)
                    }}
                    renderItem={brandItem}
                />
            </View>
        )
    }
    const projectItem = (item: ListRenderItemInfo<any>) => {

        return <ProjectItemCard containerStyle={{ ...comnViewStyles.hzPadContainer, }} />
    }
    return (
        <WrapperContainer
            issafeAreaView
            renderHeader={<TabbarHeader />}
        >
            <View
                style={styles.container}
            >
                <View style={{ ...comnViewStyles.hzPadContainer, gap: moderateScaleVertical(15) }}>

                    {/* MARK:- Search view */}
                    <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(10) }}>
                        <SearchBar
                            placeholder={lang?.Search_for_Collaborations}
                            containerStyle={{ flex: 1 }} />
                        <WishlistButton />
                    </View>
                </View>
                <FlatList
                    stickyHeaderIndices={[1]}
                    stickyHeaderHiddenOnScroll
                    contentContainerStyle={{
                        // ...comnViewStyles.hzPadContainer,
                        paddingVertical: moderateScaleVertical(15),
                        gap: moderateScaleVertical(10)
                    }}

                    ItemSeparatorComponent={({ leadingItem }) => {
                        // console.log('ItemSeparatorComponent data:---', leadingItem);
                        if (leadingItem?.type !== 'item') {
                            return <></>

                        }
                        return (
                            <LineView height={1}
                                marginTop={moderateScale(5)}
                                backgroundColor={colors.bg_action}
                                marginHorizontal={comnViewStyles.hzPadContainer.paddingHorizontal}
                            />
                        )
                    }}
                    ListHeaderComponent={() =>
                        <View style={{ ...comnViewStyles.hzPadContainer, gap: moderateScaleVertical(15) }}>
                            {/* MARK:- Make connections Banner */}
                            <MakeConnectionsView />
                        </View>
                    }
                    scrollEventThrottle={16} // Ensure smooth scrolling
                    renderItem={({ item }) => {
                        if (item.type === 'segment') {
                            return (
                                <View style={{ ...comnViewStyles.hzPadContainer, backgroundColor: colors.appBg }}>
                                    <SegmentView
                                        defaultSelected={selectedTab}
                                        onSelectItem={(item) => setSelectedTab(item)}
                                        tabItems={[
                                            { title: lang.Best_Matches, id: 0 },
                                            { title: lang.Open_Projects, id: 1 },
                                        ]}
                                    />
                                </View>
                            );
                        } else if (item.type === 'brandList') {
                            return <BrandListView />
                        }

                        return projectItem(item);
                    }}
                    // data={Array(100)}
                    data={selectedTab.id == 0 ? [{ type: 'segment' }, ...Array(2).fill({ type: 'item' })] : [{ type: 'segment' }, { type: 'brandList' }, ...Array(2).fill({ type: 'item' })]}
                // renderScrollComponent={(props) => <Animated.ScrollView {...props} />} // For animations
                />
            </View>
            {/* </CustomScrollView> */}
        </WrapperContainer>

    )
}

export default HomeTabScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        justifyContent: 'center',
        zIndex: 1,
    },
})