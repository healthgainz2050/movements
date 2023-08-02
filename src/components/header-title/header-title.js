import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

export const HeaderTitle = ({title}) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
