import React from 'react';
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colors } from '../../style';

/**
 * Button used to like or dislike a user profile.
 */
export function SwipeButton(props: {
  /** Kind of the button you want to display */
  type: 'like' | 'dislike';
  style?: StyleProp<ViewStyle>;
  animatedStyle?: Animated.AnimateStyle<ViewStyle>;
  onPress: () => void;
}): React.ReactElement {
  const { type, style, onPress, animatedStyle } = props;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: type === 'like' ? Colors.GREEN : Colors.YELLOW }]}
      onPress={onPress}
    >
      <Animated.View style={[styles.animatedContainer, style, animatedStyle]}>
        {type === 'like' ? (
          <Image style={styles.image} source={require('./check.png')} />
        ) : (
          <Image style={styles.image} source={require('./close.png')} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // backgroundColor: Colors.WHITE,
    borderRadius: 100,
    // justifyContent: 'center',
    // position: 'relative',
  },
  image: {
    width: 36,
    height: 36,
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 100,
  },
});
