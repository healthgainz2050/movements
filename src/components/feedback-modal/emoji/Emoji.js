import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {emojis} from '../../../assets/emojis';
import {EMOJI_TYPES} from './constants';
import {styles} from './styles';

export const Emoji = ({selectedEmoji, onPressEmoji}) => {
  return Object.keys(EMOJI_TYPES).map((item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onPressEmoji(item)}
        style={[
          styles.emojiContainer,
          {borderColor: item === selectedEmoji ? 'grey' : '#eaeaea'},
        ]}>
        <Image source={emojis[item]} style={styles.img} />
      </TouchableOpacity>
    );
  });
};
