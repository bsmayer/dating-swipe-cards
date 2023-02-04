import React from 'react';
import { User } from '@models/user';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import {
  BioContainer,
  BioText,
  Container,
  Distance,
  ProfileName,
  ProfilePicture,
  SectionTitle,
  StyledCloseButton,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils/dimensions';

interface ProfileDetailsParams {
  user: User;
}

export const ProfileDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { bottom, top } = useSafeAreaInsets();
  const { user } = useRoute().params as ProfileDetailsParams;

  return (
    <Container contentContainerStyle={{ paddingBottom: bottom }}>
      <Carousel
        loop={false}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT / 1.5}
        autoPlay={false}
        data={user.pictures}
        scrollAnimationDuration={500}
        renderItem={({ item }) => <ProfilePicture source={{ uri: item }} resizeMode="cover" />}
      />
      <ProfileName>
        {user.name}, {user.age}
      </ProfileName>
      <Distance>{user.distance}km from you</Distance>
      <BioContainer>
        <SectionTitle>Bio</SectionTitle>
        <BioText>{user.bio}</BioText>
      </BioContainer>
      <StyledCloseButton onPress={() => navigation.goBack()} top={top + 20} />
    </Container>
  );
};
