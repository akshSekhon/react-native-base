import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import ImageHelper from '../Assets/Gallery/ImageHelper';
import { getStyles } from '../CommonStyles';
import { scale, textScale } from '../CommonStyles/responsiveSize';
import { ThemeContext } from '../Providers/ThemeProvider';

interface Props {
    textSize?: number,
    logoSize?: number
}
const AppLogo: FC<Props> = ({ textSize = textScale(70), logoSize = scale(100) }) => {
    const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
    return (
        <View style={{ alignItems: 'center', }}>

            <Image
                source={ImageHelper.icons.AppLogo}
                style={{ height: logoSize, width: logoSize, resizeMode: 'contain' }}
            />
            <Text style={{ ...textStyles.logoTitle, fontSize: textSize, lineHeight: textSize }} >taglo</Text>
        </View>
    );
};

export default React.memo(AppLogo);
