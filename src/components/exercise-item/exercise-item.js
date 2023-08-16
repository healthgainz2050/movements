import React from 'react';
import {Text, Checkbox, HStack, Box, Pressable} from 'native-base';
import FeedbackModal from '../feedback-modal/modal';
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
  variant,
}) => {
  var presseableWidth = !item?.video_url ? '70%' : '80%';

  if (variant === 'full') {
    presseableWidth = '100%';
  }
  const renderCheckbox = item => {
    if (!item?.video_url) {
      return (
        <Text
          bold
          onPress={onPress}
          width="30%"
          p="3"
          color={isWithFeedback ? '#fff' : '#000'}>
          Add Video
        </Text>
      );
    } else {
      return (
        <Box width="20%">
          <Checkbox
            p="1"
            m="5"
            isChecked={isChecked}
            onChange={newValue => {
              onPressCheckbox(newValue);
            }}
            colorScheme="green"
          />
        </Box>
      );
    }
  };
  {
    /* <CastMe /> */
  }
  return (
    <HStack
      bg={isWithFeedback ? '#3862CF' : '#5B9CFF'}
      justifyContent="space-between"
      rounded="8"
      mt="2">
      <Pressable onPress={onPress} p="3" width={presseableWidth}>
        <Text bold color={isWithFeedback ? '#fff' : '#000'}>
          {title}
        </Text>
        {subtitle ? (
          <Text color={isWithFeedback ? '#fff' : '#000'}>{subtitle}</Text>
        ) : null}
        {description ? (
          <Text color={isWithFeedback ? '#fff' : '#000'}>{description}</Text>
        ) : null}
      </Pressable>
      {isWithFeedback && (
        <FeedbackModal
          item={item}
          addSentimentToExercise={addSentimentToExercise}
        />
      )}
      {isCheckbox && renderCheckbox(item)}
    </HStack>
  );
};
