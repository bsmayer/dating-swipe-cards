import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { WHITE } from '@style/colors';
import { SCREEN_WIDTH } from '@utils/dimensions';

export const Container = styled.View`
  width: ${SCREEN_WIDTH - 48}px;
  height: 90%;
  border-radius: 8px;
  position: relative;
`;

export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const GradientContainer = styled(LinearGradient)`
  border-radius: 8px;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 21px;
`;

export const Name = styled.Text`
  font-size: 32px;
  color: ${WHITE};
  font-weight: 600;
`;

export const Distance = styled.Text`
  color: ${WHITE};
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
`;
