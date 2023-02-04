import { CloseButton } from '@components/CloseButton';
import { SCREEN_HEIGHT } from '@utils/dimensions';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  position: relative;
`;

export const ProfilePicture = styled.Image`
  width: 100%;
  height: ${SCREEN_HEIGHT / 1.5}px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const ProfileName = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: #444;
  margin-top: 20px;
  padding-left: 24px;
`;

export const Distance = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #555;
  margin-top: 5px;
  padding-left: 24px;
`;

export const BioContainer = styled.View`
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 500;
  color: #444;
  margin-bottom: 10px;
`;

export const BioText = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const StyledCloseButton = styled(CloseButton)<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 24px;
`;
