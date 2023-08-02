import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './styles';
import {props, defaultProps} from './props';

export const Spinner = ({color, size}) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

Spinner.props = props;
Spinner.defaultProps = defaultProps;
