import React from 'react';
import {Image, View, Platform, StyleSheet} from 'react-native';
const CONE_SRC = require('../assets/HGMark1.png');
export const Cone = ({variant}) => {
  return (
    <View style={styles.container}>
      <View style={variant === 'modal' ? styles.modalCone1 : styles.cone1} />
      <View style={variant === 'modal' ? styles.modalCone2 : styles.cone2} />
      <Image
        source={CONE_SRC}
        style={variant === 'modal' ? styles.modalImage : styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 10,
    zIndex: 50,
  },
  cone1: {
    width: 60,
    height: 90,
    backgroundColor: '#44CF38',
    position: 'absolute',
    top: Platform.OS === 'android' ? -25 : undefined,
    right: Platform.OS === 'android' ? 15 : -30,
    borderBottomLeftRadius: 500,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}, {skewX: '60deg'}],
  },
  cone2: {
    width: 60,
    height: 90,
    top: Platform.OS === 'android' ? -32 : undefined,
    backgroundColor: '#5B9CFF',
    position: 'absolute',
    right: Platform.OS === 'android' ? -10 : -80,
    borderBottomLeftRadius: 500,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}, {skewX: '60deg'}],
  },
  image: {
    resizeMode: 'contain',
    height: Platform.OS === 'android' ? 40 : 50,
    width: Platform.OS === 'android' ? 40 : 50,
    alignSelf: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? 8 : -15,
  },
  modalCone1: {
    width: 60,
    height: 90,
    backgroundColor: '#44CF38',
    position: 'absolute',
    top: Platform.OS === 'android' ? -25 : undefined,
    right: Platform.OS === 'android' ? 5 : -30,
    borderBottomLeftRadius: 500,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}, {skewX: '60deg'}],
  },
  modalCone2: {
    width: 60,
    height: 90,
    top: Platform.OS === 'android' ? -32 : undefined,
    backgroundColor: '#5B9CFF',
    position: 'absolute',
    right: Platform.OS === 'android' ? -15 : -80,
    borderBottomLeftRadius: 500,
    transform: [{scaleY: 1.5}, {scaleX: 1.5}, {skewX: '60deg'}],
  },
  modalImage: {
    resizeMode: 'contain',
    height: Platform.OS === 'android' ? 40 : 50,
    width: Platform.OS === 'android' ? 40 : 50,
    alignSelf: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'android' ? 0 : -15,
  },
});
