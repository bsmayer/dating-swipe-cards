import React, { useState, useImperativeHandle, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  withDelay,
  useDerivedValue,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { User } from '@models/user';
import {
  CardBackground,
  CardsContainer,
  Container,
  CurrentProfileAnimatedContainer,
  NextCardAnimatedContainer,
  NoMoreCardsContainer,
  NoMoreItemsText,
} from './styles';
import { GREEN, YELLOW } from '@style/colors';
import { ActionBar } from '../ActionBar';
import { SCREEN_WIDTH } from '@utils/dimensions';

const CARD_HIDDEN_POSITION = SCREEN_WIDTH * 1.4;
const MAX_ROTATION = 65;

enum SwipeDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

interface AnimatedCardStackProps {
  profiles: User[];
  renderCard: (user: User) => React.ReactNode;
  onSwipe?: (params: { hasMore: boolean; currentIndex: number; amountLeft: number }) => void;
  onSwipeRight: (userId: string) => Promise<void>;
  onSwipeLeft: (userId: string) => Promise<void>;
  onPress?: (user: User) => void;
}

export interface AnimatedCardStackRef {
  swipeRight: () => void;
  swipeLeft: () => void;
}

const AnimatedCardStackComponent: React.ForwardRefRenderFunction<AnimatedCardStackRef, AnimatedCardStackProps> = (
  { profiles, renderCard, onSwipeRight, onSwipeLeft, onSwipe, onPress },
  ref
) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number>(currentIndex + 1);
  const currentProfile = currentIndex >= 0 && profiles.length > currentIndex ? profiles[currentIndex] : undefined;
  const nextProfile = nextIndex >= 0 && profiles.length > nextIndex ? profiles[nextIndex] : undefined;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotationZ = useDerivedValue(() => {
    return interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-MAX_ROTATION, 0, MAX_ROTATION],
      Extrapolate.CLAMP
    );
  }, [translateX]);

  /**
   * Animated style of the top card
   */
  const currentProfileAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotationZ.value}deg` },
      ],
    };
  }, []);

  /**
   * Animated style of the card behind
   */
  const nextProfileAnimatedStyle = useAnimatedStyle(() => {
    const nextCardScale = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [1, 0.8, 1],
      Extrapolate.CLAMP
    );
    const nextCardOpacity = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [1, 0.5, 1],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: !!nextProfile ? nextCardScale : 1 }, { translateX: 0 }, { translateY: 0 }],
      opacity: nextCardOpacity,
    };
  }, []);

  /**
   * Animated style of the background overlay when the user
   * swipes right
   */
  const swipeRightBackgroundColor = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, SCREEN_WIDTH], [0, 0.5], Extrapolate.CLAMP),
    };
  }, []);

  /**
   * Animated style of the left background when the user
   * swipes left
   */
  const swipeLeftBackgroundColor = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, -SCREEN_WIDTH], [0, 0.5], Extrapolate.CLAMP),
    };
  }, []);

  /**
   * Function fired when the user drags the card all the way to the right or left.
   */
  const onCardSwiped = (direction: SwipeDirection) => {
    if (!currentProfile) return;

    const hasMore = currentIndex + 1 < profiles.length;
    onSwipe?.({
      hasMore,
      currentIndex,
      amountLeft: profiles.length - currentIndex + 1,
    });

    if (direction === SwipeDirection.RIGHT) {
      onSwipeRight(currentProfile.id);
      translateX.value = withTiming(CARD_HIDDEN_POSITION, { duration: 300 }, () => {
        runOnJS(onEndCardAnimation)();
      });
    } else {
      onSwipeLeft(currentProfile.id);
      translateX.value = withTiming(-CARD_HIDDEN_POSITION, { duration: 300 }, () => {
        runOnJS(onEndCardAnimation)();
      });
    }
  };

  /**
   * Determine if there's more cards to be swiped and
   * reset the screen state
   */
  const onEndCardAnimation = () => {
    // // If it's the last profile on the list
    if (currentIndex + 1 >= profiles.length) {
      setCurrentIndex(-1);
      return setNextIndex(-1);
    }

    // // If there's at least 2 profiles in the list
    if (currentIndex + 2 < profiles.length) {
      setCurrentIndex(currentIndex + 1);
      return resetCardsPosition(nextIndex + 1);
    }

    // // If there's only one profile left
    if (currentIndex + 1 < profiles.length) {
      setCurrentIndex(currentIndex + 1);
      return resetCardsPosition(-1);
    }
  };

  /**
   * Reset the cards position with a delay so the screen doesn't
   * glitch / flash. This will guarantee a smooth animation and UX.
   */
  const resetCardsPosition = (nextCardIndex: number) => {
    translateX.value = withDelay(
      100,
      withTiming(0, { duration: 0 }, () => {
        runOnJS(setNextIndex)(nextCardIndex);
      })
    );
    translateY.value = withDelay(100, withTiming(0, { duration: 0 }));
  };

  /**
   * The swipe right/left gesture handler.
   */
  const swipeGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: (event) => {
      // Animates the card back to the initial position when the user doesn't
      // drag the card enough.
      const snapTresh = SCREEN_WIDTH * 0.4;
      if (Math.abs(translateX.value) < snapTresh) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        return;
      }

      const isLike = translateX.value > 0;
      runOnJS(onCardSwiped)(isLike ? SwipeDirection.RIGHT : SwipeDirection.LEFT);
    },
  });

  /**
   * Exposes the swipeRight and swipeLeft as ref if needed
   */
  useImperativeHandle(ref, () => ({
    swipeRight: () => onCardSwiped(SwipeDirection.RIGHT),
    swipeLeft: () => onCardSwiped(SwipeDirection.LEFT),
  }));

  /**
   * If there's no more profiles to show, return a cool message
   */
  if (!currentProfile) {
    return (
      <NoMoreCardsContainer>
        <NoMoreItemsText size={24}>You're a swiper!</NoMoreItemsText>
        <NoMoreItemsText marginTop={10}>Come back later for more profiles</NoMoreItemsText>
      </NoMoreCardsContainer>
    );
  }

  return (
    <Container>
      <CardsContainer>
        {nextProfile && (
          <NextCardAnimatedContainer style={[nextProfileAnimatedStyle]}>
            {renderCard(nextProfile)}
          </NextCardAnimatedContainer>
        )}

        {currentProfile && (
          <TapGestureHandler onActivated={() => onPress?.(currentProfile)}>
            <Animated.View>
              <PanGestureHandler onGestureEvent={swipeGestureHandler}>
                <CurrentProfileAnimatedContainer style={[currentProfileAnimatedStyle]}>
                  {renderCard(currentProfile)}
                  <CardBackground style={swipeRightBackgroundColor} backgroundColor={GREEN} />
                  <CardBackground style={swipeLeftBackgroundColor} backgroundColor={YELLOW} />
                </CurrentProfileAnimatedContainer>
              </PanGestureHandler>
            </Animated.View>
          </TapGestureHandler>
        )}
      </CardsContainer>

      <ActionBar
        onLike={() => onCardSwiped(SwipeDirection.RIGHT)}
        onDislike={() => onCardSwiped(SwipeDirection.LEFT)}
        cardTranslateX={translateX}
      />
    </Container>
  );
};

export const AnimatedCardStack = React.forwardRef(AnimatedCardStackComponent);
