import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const { width, height, } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const fontRatio = PixelRatio.getFontScale()
const pxl = PixelRatio.get()

// const scale = size => (width / guidelineBaseWidth) * size;
// const verticalScale = size => (height / guidelineBaseHeight) * size;
// const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
console.log('getPixelSizeForLayoutSize :-- ', pxl);

const horizMutipier = (sz: number) => width * sz
const verticMutipier = (sz: number) => height * sz
// const textScale = (size)=> (Number(size) * fontRatio) 

export const textScale = (size: number): number => RFValue(size)

// const textScale1 = percent => {
// 	const screenHeight = Dimensions.get('window').height;
// 	//calculate absolute ratio for bigger screens 18.5:9 requiring smaller scaling
// 	const ratio = Dimensions.get('window').height / Dimensions.get('window').width;
// 	//Guideline sizes are based on standard ~5″ screen mobile device
// 	const deviceHeight = 375
// 		? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) //Set guideline depending on absolute ratio
// 		: Platform.OS === 'android'
// 			? screenHeight - StatusBar.currentHeight
// 			: screenHeight;

// 	const heightPercent = (percent * deviceHeight) / 100;
// 	return Math.round(heightPercent);
// };

export { scale, verticalScale, textScale, moderateScale, moderateScaleVertical, width, height, horizMutipier, verticMutipier, widthPercentageToDP, heightPercentageToDP };