import React from 'react';
import styled from 'styled-components/native';

import { PINK } from '@style/colors';

export const Logo: React.FC = () => {
  return <LogoText>SWIPER</LogoText>;
};

const LogoText = styled.Text`
  color: ${PINK};
  font-weight: 800;
  font-size: 36px;
`;
