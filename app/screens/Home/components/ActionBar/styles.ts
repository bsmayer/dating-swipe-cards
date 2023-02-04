import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { SwipeButton } from '@components/Button';

export const ButtonsContainer = styled(Animated.View)`
  flex-direction: row;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  width: 200px;
`;

export const StyledSwipeButton = styled(SwipeButton)`
  width: 76px;
  height: 76px;
`;
