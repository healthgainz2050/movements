import React from 'react';
import {Button, Box} from 'native-base';

export const NBButton = ({label, onPress}) => {
  return (
    <Box alignItems="center" _text={textStyle}>
      <Button
        size={'lg'}
        backgroundColor="#007aff"
        pl="20"
        pr="20"
        onPress={onPress}>
        {label}
      </Button>
    </Box>
  );
};

const textStyle = {
  color: 'white',
  fontWeight: 800,
};
