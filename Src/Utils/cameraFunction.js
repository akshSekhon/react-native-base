import { Alert } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission, checkCameraAndGallaryPermision } from "./permissions";

// MARK:--Select Option Alert
export const selectImageOptions = (setValue) => {
  console.log(setValue);
  Alert.alert("Upload Image", "Choose an option", [
    {
      text: "Camera",
      onPress: () => openCamera(setValue),
    },
    {
      text: "Gallery",
      onPress: () => openGallery(setValue),
    },
    {
      text: "Cancel",
      // onPress: () => console.log("OK Pressed"),
      style: "cancel",
    },
  ]);
};
//MARK: -- openGallery

export const openGallery = async (ongettingImage = () => { }) => {

  try {
    const options = {
      storageOptions: {
        path: "images",
        mediaType: "photo"
      },
      includeBase64: false
    }

    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo'
    }).then(images => {
      console.log(images);
      ongettingImage(images);
    });

  } catch (error) {
    console.log("error gallery picture", error)
  }


}
//MARK: -- openCamera

const openCamera = async (ongettingImage = () => { }) => {

  const check = androidCameraPermission().then((res) => {
    console.log('res camera permisiion : ----', res);
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      console.log(image);
      ongettingImage(image);

    });

  }).catch((err) => {
    console.log('err camera permisiion : ----', err);
  })
}
