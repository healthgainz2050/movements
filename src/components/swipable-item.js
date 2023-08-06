import React from 'react';
import {View} from 'react-native';
import {Text, Image} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {windowWidth} from '../utils';
import {StyleSheet} from 'react-native';

export const SwipeableItem = ({onPress, title, iconProps, style}) => ({
  text: (
    <View style={[styles.itemStyle, style]}>
      {iconProps.image ? (
        <Image
          height="5"
          pt="5"
          resizeMode="contain"
          source={iconProps.image}
        />
      ) : (
        <MaterialIcons
          name={iconProps.name}
          size={iconProps.size || 25}
          color={'#fff'}
        />
      )}
      <Text size="l" bold color="#fff">{title}</Text>
    </View>
  ),
  onPress,
});

export const PDF = ({onPress}) => {
  const title = 'PDF';
  const iconProps = {
    image: require('../assets/pdf.png'),
    name: 'picture-as-pdf',
    color: 'black',
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
  });
};

export const Close = ({onPress}) => {
  const title = 'Close';
  const iconProps = {
    name: 'close',
    color: 'black',
    size: 20,
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
  });
};

export const Diary = ({onPress}) => {
  const title = 'Diary';
  const iconProps = {
    image: require('../assets/diary.png'),
    name: 'event',
    color: 'deepskyblue',
  };
  const style = {
    width: windowWidth * 0.3,
    borderColor: 'deepskyblue',
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
    style,
  });
};

export const Edit = ({onPress}) => {
  const title = 'Edit';
  const iconProps = {
    image: require('../assets/edit.png'),
    name: 'edit',
    color: 'white',
  };
  const style = {
    width: windowWidth * 0.3,
    // backgroundColor: 'deepskyblue',
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
    style,
  });
};
export const Delete = ({onPress}) => {
  const title = 'Delete';
  const iconProps = {
    image: require('../assets/delete.png'),
    name: 'delete',
    color: 'white',
  };
  const style = {
    width: windowWidth * 0.3,
    // backgroundColor: 'red',
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
    style,
  });
};

export const AnalysisItem = ({onPress}) => {
  const title = 'Usage';
  const iconProps = {
    image: require('../assets/chart.png'),
    name: 'equalizer',
    // color: 'green',
  };
  const style = {
    width: windowWidth * 0.3,
    // borderColor: 'green',
  };
  return SwipeableItem({
    title,
    iconProps,
    onPress,
    style,
  });
};

export const styles = StyleSheet.create({
  itemStyle: {
    width: windowWidth * 0.2,
    height: 80,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#5B9CFF',
    color: '#fff',
  },
});
