// import React, { FC } from 'react';
// import { Modal, StyleSheet, View, ViewStyle } from 'react-native';
// import { MaterialIndicator } from 'react-native-indicators';
// // import { getStyles } from '../HelperFiles/HelperFunction';
// import { getStyles } from '../../../../CommonStyles';
// import { ThemeContext } from '../../../../Providers/ThemeProvider';
// import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters';

// import ImageHelper from '../../../../Assets/Gallery/ImageHelper';

// import { goBack } from '../../../../Navigations/NavigationService';
// import Text_N from '../../../../Components/TextComponents/Text_N';
// import Touchable from '../../../../Components/Touchable';
// import WishlistButton from '../../../../Components/WishlistButton';
// import LoaderImage from '../../../../Components/LoaderImage';
// import LineView from '../../../../Components/LineView';
// import { tags } from 'react-native-svg/lib/typescript/xmlTags';



// // import CommonStyles from '../Styles/CommonStyles';
// // import colors from '../styles/colors';

// interface Props extends ViewStyle {
//     onPressBack?: () => void,
//     containerStyle: ViewStyle
// }

// const ChipView = ({ title, index }: { title: string, index?: number }) => {
//     const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)

//     return (
//         <View
//             key={index}
//             style={{
//                 paddingHorizontal: moderateScale(15),
//                 paddingVertical: moderateVerticalScale(4),
//                 borderColor: colors.border_action,
//                 borderRadius: 100,
//                 borderWidth: moderateScale(1)
//             }}>
//             <Text_N style={{ ...textStyles.lbl_small, color: colors.txt_action }}>{title}</Text_N>
//         </View>
//     )
// }

// const ProjectItemCard: FC<Props> = ({ ...props }) => {
//     const { colors, comnViewStyles, textStyles, lang } = getStyles(ThemeContext)
//     // const comnViewStyles = getComnViewStyles(ThemeContext)
//     const dataArr = ['Beauty', 'Men']
//     return (
//         <View style={{ flex: 1, gap: moderateVerticalScale(10), ...props?.containerStyle }}>
//             {/* MARK:- Top View */}
//             <View style={{ ...comnViewStyles.rowContainerSB, }}>
//                 <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(4), flex: 1 }}>
//                     <LoaderImage
//                         uri={ImageHelper.temp.nykaa}
//                         resizeMode='cover'
//                         style={{ width: scale(60), height: scale(20) }}
//                     />
//                     <LineView width={1.2} height={'80%'} backgroundColor={colors.bg_action} />
//                     <Text_N style={{ ...textStyles.title_small, color: colors.txt_black, flex: 1 }}>{'Product Name'}</Text_N>
//                 </View>
//                 <WishlistButton />
//             </View>
//             {/* MARK:- Description text */}

//             <Text_N style={{ ...textStyles.body_small, color: colors.txt_disable, lineHeight: 16, flex: 1 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text_N>
//             <View style={style.tagsContainer} >
//                 {dataArr && dataArr.map((ele, index) => <ChipView title={ele} index={index} />)}
//             </View>

//             <View style={{ ...comnViewStyles.rowContainer_A_C, gap: moderateScale(4), flex: 1 }}>
//                 <Text_N style={{ ...textStyles.actn_medium, color: colors.txt_black, }}>{`${lang.Budget}: ₹ 50,000`}</Text_N>

//                 <LineView width={1.8} height={'90%'} backgroundColor={colors.txt_black} />
//                 <Text_N style={{ ...textStyles.actn_medium, color: colors.txt_black, }}>{`${3} ${lang?.deliverables}`}</Text_N>
//             </View>

//             <Text_N style={{ ...textStyles.body_small, color: colors.txt_black }}>{`${lang.Proposals}: ${20}`}</Text_N>

//         </View>
//     );
// };

// const style = StyleSheet.create({
//     tagsContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         rowGap: moderateScale(5),
//         columnGap: moderateScale(8)
//     }
// })
// export default React.memo(ProjectItemCard);
