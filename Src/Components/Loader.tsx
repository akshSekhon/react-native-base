import React, { FC } from 'react';
import { Modal, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { getStyles } from '../CommonStyles';
import { ThemeContext } from '../Providers/ThemeProvider';

interface Props {
  isLoading?: boolean
}
const Loader: FC<Props> = ({ isLoading = false }) => {
  const { colors, comnViewStyles, textStyles } = getStyles(ThemeContext)
  // const comnViewStyles = getComnViewStyles(ThemeContext)
  if (isLoading) {
    return (
      <Modal transparent visible={isLoading}>
        <View
          style={{
            ...comnViewStyles.loader,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}>

          <MaterialIndicator
            color={colors.bg_action}
            size={35}
          />
        </View>
      </Modal>
    );
  }
  return null;
};

export default React.memo(Loader);
