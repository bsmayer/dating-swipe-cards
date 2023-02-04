import React, { useEffect, useRef, useState } from 'react';

import { Logo } from '@components/Logo';
import { AnimatedCardStack, AnimatedCardStackRef } from '@screens/Home/components/AnimatedCardStack';
import { useUsers } from '@hooks/users';
import { Card } from '@screens/Home/components/Card';
import { Container, HeaderContainer } from './styles';
import { User } from '@models/user';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Routes } from '@constants/routes';
import { MatchOverlay } from './components/MatchOverlay';

export const HomeScreen: React.FC = () => {
  const cardStackRef = useRef<AnimatedCardStackRef>(null);
  const navigation = useNavigation();
  const [showMatchOverlay, setShowMatchOverlay] = useState<boolean>(false);
  const { users, loadUsers, likeUser, dislikeUser } = useUsers();

  const onCardPress = (user: User) => {
    navigation.dispatch(
      CommonActions.navigate(Routes.PROFILE_DETAILS, {
        user,
      })
    );
  };

  const likeUserAndCheckMatch = async (userId: string) => {
    const matched = await likeUser(userId);
    if (matched) {
      setShowMatchOverlay(true);
    }
  };

  const fetchNextBatch = async () => {
    await loadUsers();
  };

  useEffect(() => {
    fetchNextBatch();
  }, []);

  return (
    <>
      <Container>
        <HeaderContainer>
          <Logo />
        </HeaderContainer>
        {!!users.length && (
          <>
            <AnimatedCardStack
              ref={cardStackRef}
              profiles={users}
              onSwipeRight={(userId) => likeUserAndCheckMatch(userId)}
              onSwipeLeft={(userId) => dislikeUser(userId)}
              onSwipe={({ amountLeft }) => amountLeft <= 5 && fetchNextBatch()}
              onPress={onCardPress}
              renderCard={(user) => (
                <Card
                  name={user.name}
                  age={user.age}
                  distance={user.distance}
                  imageUri={user.pictures[0]}
                  distanceUnit="km"
                />
              )}
            />
          </>
        )}
      </Container>
      {showMatchOverlay && <MatchOverlay onClose={() => setShowMatchOverlay(false)} />}
    </>
  );
};
