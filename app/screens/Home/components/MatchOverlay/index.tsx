import { GREEN, YELLOW } from '@style/colors';
import React from 'react';
import { FadeIn, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GradientContainer,
  Description,
  SafeAreaContainer,
  Title,
  AnimatedContainer,
  StyledCloseButton,
} from './styles';

interface MatchOverlayProps {
  onClose: () => void;
}

/**
 * Overlay displayed on the home screen when the user has a match
 */
export const MatchOverlay: React.FC<MatchOverlayProps> = ({ onClose }) => {
  const { top } = useSafeAreaInsets();

  return (
    <AnimatedContainer entering={FadeIn}>
      <GradientContainer colors={[`${YELLOW}E6`, `${GREEN}E6`]}>
        <SafeAreaContainer>
          <Title>It's a Match</Title>
          <Description>You may have found the love of your life, go get'em</Description>
        </SafeAreaContainer>
      </GradientContainer>
      <StyledCloseButton onPress={onClose} top={top + 20} />
    </AnimatedContainer>
  );
};
