
import { CustomButton, CustomScrollView, LineView, LoaderImage, RadialGradientView, SegmentView, TabbarHeader, Text_N, WrapperContainer } from '../../../../Components/index.tsx'
import { useIsFocused } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import ImageHelper from '../../../../Assets/Gallery/ImageHelper'
import { useStyles } from '../../../../CommonStyles/index'
import { shadowBox } from '../../../../CommonStyles/CommonViewStyles'
import { moderateScale, moderateScaleVertical, scale } from '../../../../CommonStyles/responsiveSize'
import { useUser } from '../../../../Providers/UserProvider'
import ProjectItemCard from '../../SharedComponents/ProjectItemCard'
import ViewBackground from '../../../../Components/ViewBackground'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import PagerView from 'react-native-pager-view';
import ProductItemCard from '../../SharedComponents/ProductItemCard.tsx'


const MakeConnectionsView = () => {
    const { lang, colors, textStyles, comnViewStyles } = useStyles()
    const colorList = [
        { color: colors.themeBlue, },
        { offset: '100%', color: colors.themeBlueGrad1, }
    ]

    return (
        <ViewBackground
            masterStyle={{ height: 250, borderRadius: 8, overflow: 'hidden' }}
            style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: moderateScale(10) }}
            backgroundChildren={
                <View style={{ flex: 1 }}>
                    <FastImage
                        source={ImageHelper.temp.product2}
                        resizeMode='cover'
                        style={{ flex: 1 }}
                    />
                    <LinearGradient
                        style={{ ...comnViewStyles.absolute0 }}
                        colors={['#0000', '#0000', '#0001', '#0002', '#0002', '#0003', '#0003']}

                    />
                </View>


            }
        >

            <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(10), marginBottom: moderateScaleVertical(10) }}>
                <View
                    style={{ padding: 0, }}
                >
                    <LoaderImage
                        uri={Image.resolveAssetSource(ImageHelper.temp.nykaa).uri}
                        resizeMode='contain'
                        style={{
                            height: scale(42),
                            aspectRatio: 1,
                            borderRadius: 100,
                            padding: 5,
                            backgroundColor: colors.bg_secLight,
                        }}
                    />
                </View>

                <Text_N style={{ ...textStyles.heading_large, color: colors.txt_white, textAlign: 'center' }}>
                    {'Nyakaa'}
                </Text_N>
            </View>
        </ViewBackground>
    )
}

const BrandDetail: FC<any> = () => {
    const { lang, colors, textStyles, comnViewStyles } = useStyles()
    const isFocused = useIsFocused()

    const { profileType } = useUser()

    const [selectedTab, setSelecteTab] = useState({ title: lang.Best_Matches, id: 0 })
    console.log('profileType creater is:----', profileType);

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

        return <ProjectItemCard
            containerStyle={{ ...comnViewStyles.hzPadContainer, }}
        />
    }

    const productItem = (item: ListRenderItemInfo<any>) => {

        return <ProductItemCard index={item.item} item={item?.item} />
    }
    return (
        <WrapperContainer
            issafeAreaView
            renderHeader={<TabbarHeader leftTitle={'Nyakaa'} />}
        >
            <View
                style={styles.container}
            >
                <CustomScrollView
                    nestedScrollEnabled
                    stickyHeaderIndices={[1]}
                >
                    <View style={{ ...comnViewStyles.hzPadContainer, gap: moderateScaleVertical(15) }}>
                        {/* MARK:- Make connections Banner */}
                        <MakeConnectionsView />
                    </View>


                    <View style={{ ...comnViewStyles.hzPadContainer, backgroundColor: colors.appBg }}>
                        <SegmentView
                            defaultSelected={selectedTab}
                            onSelectItem={(item) => {
                                console.log('onSelectItem:--', item);
                                setSelecteTab(item)
                            }}
                            tabItems={[
                                { title: lang.Products, id: 0 },
                                { title: lang.Products, id: 1 },
                            ]}
                        />
                    </View>

                    {/* <PagerView style={{ flex: 1 }} initialPage={0}> */}

                    {selectedTab?.id == 1 ?
                        <View style={{ flex: 1 }}>
                            <Animated.FlatList
                                key={'FlatListOne'}

                                scrollEnabled={false}
                                contentContainerStyle={{
                                    // ...comnViewStyles.hzPadContainer,
                                    paddingVertical: moderateScaleVertical(15),
                                    gap: moderateScaleVertical(10)
                                }}

                                ItemSeparatorComponent={({ leadingItem }) => {
                                    return (
                                        <LineView height={1}
                                            marginTop={moderateScale(5)}
                                            backgroundColor={colors.bg_action}
                                            marginHorizontal={comnViewStyles.hzPadContainer.paddingHorizontal}
                                        />
                                    )
                                }}
                                scrollEventThrottle={16} // Ensure smooth scrolling
                                renderItem={projectItem}
                                // data={Array(100)}
                                data={Array(5).fill({ type: 'item' })}
                                renderScrollComponent={(props) => <Animated.ScrollView {...props} />} // For animations
                            />
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <Animated.FlatList
                                key={'FlatListtwo'}
                                scrollEnabled={false}
                                contentContainerStyle={{
                                    // ...comnViewStyles.hzPadContainer,
                                    paddingVertical: moderateScaleVertical(15),
                                    paddingHorizontal: moderateScaleVertical(20),
                                    gap: moderateScaleVertical(10)
                                }}
                                numColumns={2}
                                columnWrapperStyle={{ gap: moderateScale(10) }}
                                scrollEventThrottle={16} // Ensure smooth scrolling
                                renderItem={productItem}
                                // data={Array(100)}
                                data={Array(5).fill({ type: 'item' })}
                                renderScrollComponent={(props) => <Animated.ScrollView {...props} />} // For animations
                            />
                        </View>
                    }
                    {/* </PagerView> */}
                </CustomScrollView>
            </View>
            {/* </CustomScrollView> */}
        </WrapperContainer>

    )
}

export default BrandDetail

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