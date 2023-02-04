import React from 'react';
import { CardImage, Container, Distance, GradientContainer, Name } from './styles';

interface CardProps {
  imageUri: string;
  name: string;
  age: number;
  distance?: number;
  distanceUnit?: 'km' | 'mi';
}

const GRADIENT_COLORS = ['#ffffff00', '#33333380'];

export const Card: React.FC<CardProps> = ({ imageUri, name, age, distance, distanceUnit }) => {
  return (
    <Container>
      <CardImage source={{ uri: imageUri }} resizeMode="cover" />

      <GradientContainer colors={GRADIENT_COLORS}>
        <Name>{`${name} • ${age}`}</Name>
        {!!distance && (
          <Distance>
            {distance}
            {distanceUnit} from you
          </Distance>
        )}
      </GradientContainer>
    </Container>
  );
};
