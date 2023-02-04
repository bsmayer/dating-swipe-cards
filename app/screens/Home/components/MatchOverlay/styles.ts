import styled from 'styled-components/native';
import GradientView from 'react-native-linear-gradient';
import { WHITE } from '@style/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { CloseButton } from '@components/CloseButton';

export const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const GradientContainer = styled(GradientView)`
  width: 100%;
  height: 100%;
`;

export const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled.Text`
  color: ${WHITE};
  font-weight: 700;
  font-size: 30px;
`;

export const Description = styled.Text`
  color: ${WHITE};
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
`;

export const StyledCloseButton = styled(CloseButton)<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 24px;
`;
