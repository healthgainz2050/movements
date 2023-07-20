import React from 'react';
import {Input} from 'native-base';

export const NBInput = ({placeholder, onChangeText, ...rest}) => {
  return (
    <Input
      size="lg"
      mb="20px"
      placeholder={placeholder}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};
