//import liraries
import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, useColorScheme, View, ViewStyle, ImageSourcePropType } from "react-native";
import FastImage, { ImageStyle, ResizeMode } from "react-native-fast-image";
import { MaterialIndicator } from "react-native-indicators";
import ImageHelper from "../Assets/Gallery/ImageHelper";
import { getStyles } from "../CommonStyles";
import { ThemeContext } from "../Providers/ThemeProvider.tsx";


// create a component

interface props {
  uri?: string,
  isLocal?: boolean
  placeHolderUri?: string,
  imageStyle?: ImageStyle,
  indicatorSize?: string,
  indicatorColor?: string,
  style?: ViewStyle,
  resizeMode?: ResizeMode,
  defaultSource?: string,
  isShowLoader?: boolean
}
const LoaderImage: FC<props> = ({
  uri,
  placeHolderUri = Image.resolveAssetSource(ImageHelper.placeHolders.userProfile).uri,
  imageStyle,
  indicatorSize,
  indicatorColor,
  style,
  resizeMode = FastImage.resizeMode.contain,
  defaultSource = ImageHelper.placeHolders.userProfile,
  isLocal = false,
  isShowLoader = false
}) => {
  const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
  if (!indicatorColor) { indicatorColor = colors.bg_primary }
  const [isloaded, setLoaded] = useState(false);
  // console [isloadingStatus,setLoadedStatus]= useState(false)
  const [image, setImage] = useState(uri ? uri : placeHolderUri);
  // console.log("image uri is : -=-- ", image);

  useEffect(() => {
    setImage(!!uri ? uri : placeHolderUri);
  }, [uri, placeHolderUri]);

  return (
    <>
      <View style={{ ...styles.container, backgroundColor: colors.transparent, ...style }}>
        <FastImage
          style={{ ...styles.image, ...imageStyle }}
          source={{
            uri: (typeof image == 'number') ? Image.resolveAssetSource(image as ImageSourcePropType).uri : image,
          }}
          resizeMode={resizeMode}
          defaultSource={defaultSource}
          onLoadStart={() => console.log("Loading Start")}
          onProgress={(e) => { setLoaded(false) }}
          onLoad={(e) => { setLoaded(false); }}
          onLoadEnd={() => { setLoaded(true); }}
          onError={() => {
            setLoaded(false);
            setImage(placeHolderUri);
          }
          }
        />
        {
          (isShowLoader && !isloaded) && (
            <View style={styles.indicator}>
              <MaterialIndicator color={indicatorColor} size={indicatorSize} />
            </View>
          )
        }
      </View >
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

  },
  image: {
    height: "100%",
    width: "100%",
  },
  indicator: {
    // height: scale(23),
    // width: scale(23),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    // borderColor: Colors.gradiantDwn,
    // bottom: moderateScale(3),
    // right: moderateScale(10)
  },
});

//make this component available to the app
// export default LoaderImage;
export default React.memo(LoaderImage);
