import React from 'react';
import { TouchableWithoutFeedback, ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ScalableAnimationProps {
  children: React.ReactNode; // Wrapped component
  style?: StyleProp<ViewStyle>; // Optional style for Animated.View
  scaleValue?: number; // Scale size when pressed, default is 0.9
  onPress?: () => void; // Action to perform on press
}

const ScalableAnimation: React.FC<ScalableAnimationProps> = ({
  children,
  style,
  scaleValue = 0.9,
  onPress,
}) => {
  const scale = useSharedValue(1); // Initial scale

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress} // Trigger onPress action
    >
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default ScalableAnimation;