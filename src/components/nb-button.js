import React from 'react';
import {Button, Box, Text} from 'native-base';

export const NBButton = ({label, onPress, size, pl, pr, mt, mb, rest}) => {
  return (
    <Box alignItems="center" _text={textStyle}>
      <Button
        size={size || 'lg'}
        backgroundColor="#007aff"
        pl={pl || '20'}
        pr={pr || '20'}
        mt={mt || undefined}
        mb={mb || undefined}
        onPress={onPress}
        {...rest}>
        <Text fontWeight="bold" color="white">
          {label}
        </Text>
      </Button>
    </Box>
  );
};

const textStyle = {
  color: 'white',
  fontWeight: 800,
};
