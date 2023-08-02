import React, {useState} from 'react';
import {View} from 'react-native';
import {Emoji} from './emoji';
import {styles} from './styles';
const FeedbackModal = ({setSentiment}) => {
  const [emoji, setEmoji] = useState(null);

  const onPressEmojiHandler = (data) => {
    setEmoji(data);
    setSentiment(data);
  };

  return (
    <View style={styles.container}>
      <Emoji onPressEmoji={onPressEmojiHandler} selectedEmoji={emoji} />
    </View>
  );
};

export default FeedbackModal;
