import React from 'react';
import {Text, CheckBox, Flex} from 'native-base';
import FeedbackModal from '../feedback-modal/modal';
import {TouchableOpacity, View} from 'react-native';
// import {CastMe} from '../CastButton';

export const ExerciseItem = ({
  onPress,
  title,
  subtitle,
  isWithFeedback,
  isCheckbox,
  isChecked,
  onPressCheckbox,
  description,
  item,
  addSentimentToExercise,
}) => {
  const renderCheckbox = item => {
    if (!item?.video_url) {
      return (
        <Text
          bold
          note
          onPress={onPress}
          noOfLines={1}
          ml="-25"
          color={isWithFeedback ? 'white' : 'black'}>
          Add Video
        </Text>
      );
    } else {
      return (
        <CheckBox
          isChecked={isChecked}
          onChange={newValue => {
            onPressCheckbox(newValue);
          }}
          colorScheme="green"
        />
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: isWithFeedback ? '#3862CF' : '#5B9CFF',
        margin: 5,
        borderRadius: 8,
      }}>
      {/* <CastMe /> */}
      <Flex direction="row" mb="2.5" mt="1.5">
        <TouchableOpacity onPress={onPress} style={{width: '85%'}}>
          <Text
            style={{
              color: isWithFeedback ? 'white' : 'black',
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              note
              numberOfLines={1}
              style={{
                color: isWithFeedback ? 'white' : 'black',
                fontWeight: 'bold',
              }}>
              {subtitle}
            </Text>
          ) : null}
          {description ? (
            <Text
              note
              numberOfLines={1}
              style={{
                color: isWithFeedback ? 'white' : 'black',
                fontWeight: 'bold',
              }}>
              {description}
            </Text>
          ) : null}
        </TouchableOpacity>
        {isWithFeedback && (
          <FeedbackModal
            item={item}
            addSentimentToExercise={addSentimentToExercise}
          />
        )}
        {isCheckbox && renderCheckbox(item)}
      </Flex>
    </View>
  );
};
