import React from 'react';
import Animated, { FadeOut } from 'react-native-reanimated';
import { ButtonsContainer, StyledSwipeButton } from './styles';

interface ActionBarProps {
  onDislike: () => void;
  onLike: () => void;
  cardTranslateX: Animated.SharedValue<number>;
}

export const ActionBar: React.FC<ActionBarProps> = ({ onDislike, onLike, cardTranslateX }) => {
  return (
    <ButtonsContainer exiting={FadeOut}>
      <StyledSwipeButton type="dislike" onPress={onDislike} />
      <StyledSwipeButton type="like" onPress={onLike} />
    </ButtonsContainer>
  );
};
