import React from 'react';
import {Button, Box, Text} from 'native-base';

export const NBButton = ({
  label,
  onPress,
  size,
  pl,
  pr,
  mt,
  mb,
  disabled,
  ...rest
}) => {
  return (
    // <Box alignItems="center" _text={textStyle}>
    <Button
      size={size || 'lg'}
      backgroundColor={!disabled ? '#007aff' : '#808080'}
      // pl={pl || '20'}
      // pr={pr || '20'}
      minWidth="50%"
      mt={mt || undefined}
      mb={mb || undefined}
      disabled={disabled}
      onPress={onPress}
      {...rest}>
      <Text fontWeight="bold" color="white">
        {label}
      </Text>
    </Button>
    // </Box>
  );
};

const textStyle = {
  color: 'white',
  fontWeight: 800,
};
