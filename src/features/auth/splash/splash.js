import React from 'react';
import {Image, ActivityIndicator, View} from 'react-native';
import {styles} from './styles';
import {images} from '../../../assets';

export const Splash = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.app_logo} />
      <ActivityIndicator size="small" />
    </View>
  );
};
