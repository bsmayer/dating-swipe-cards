import React from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { CloseImage, TouchableContainer } from './styles';

interface CloseButtonProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ style, onPress }) => {
  return (
    <TouchableContainer onPress={onPress} style={[styles.shadow, style]}>
      <CloseImage source={require('./closeIcon.png')} />
    </TouchableContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
