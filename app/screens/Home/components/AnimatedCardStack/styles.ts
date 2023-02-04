import { PINK } from '@style/colors';
import Animated from 'react-native-reanimated';
import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
`;

export const CardsContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const NextCardAnimatedContainer = styled(Animated.View)`
  position: absolute;
  height: 100%;
`;

export const CurrentProfileAnimatedContainer = styled(Animated.View)`
  height: 100%;
  position: relative;
`;

export const NoMoreCardsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoMoreItemsText = styled.Text<{ size?: number; marginTop?: number }>`
  color: ${PINK};
  font-size: ${(props) => props.size || 14}px;
  font-weight: 600;
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop}px;
    `}
`;

export const CardBackground = styled(Animated.View)<{ backgroundColor: string }>`
  background: ${(props) => props.backgroundColor};
  position: absolute;
  height: 90%;
  width: ${SCREEN_WIDTH - 48}px;
`;
