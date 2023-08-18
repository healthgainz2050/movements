import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {props, defaultProps} from './props';
import {Container} from 'native-base';
import {windowHeight, windowWidth} from '../../utils';

export const VideoPlayerNative = ({uri, onEndVideo, isClientHome}) => {
  let source = {uri};
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [repeat, setRepeat] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);

  useEffect(() => {
    if (uri) {
      setPositionMillis(0);
    }
  }, [uri]);

  let updatedUri = uri;
  if (uri.indexOf('dropbox.com') !== -1) {
    updatedUri = uri.replace('dl=0', 'raw=1');
  }
  return (
    <Container
      maxWidth="100%"
      height={isClientHome ? '32%' : '50%'}
      bg="primary.100">
      <VideoPlayer
        ref={playerRef}
        video={{uri: updatedUri}}
        thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        autoplay={repeat}
        loop={repeat}
        videoProps={{
          shouldPlay: true,
          resizeMode: VideoPlayer.COVER,
          source,
          volume,
          isLooping: repeat,
          millis: positionMillis,
        }}
        inFullscreen={false}
        onEnd={onEndVideo}
        style={{
          width: isClientHome ? windowWidth : windowWidth * 0.85,
          height: windowHeight * 0.2,
        }}
      />
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <MaterialIcons name="volume-up" size={24} color="black" />
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={100}
            value={volume * 100}
            minimumTrackTintColor="#2eaeec"
            onValueChange={value => {
              setVolume(value / 100);
            }}
            maximumTrackTintColor="#000000"
            vertical={true}
          />
        </View>
        <TouchableOpacity style={styles.row} onPress={() => setRepeat(!repeat)}>
          <MaterialIcons
            name="repeat"
            size={24}
            color={!repeat ? 'grey' : '#2eaeec'}
          />
          <Text style={styles.autoText}>Auto Play</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

VideoPlayerNative.props = props;
VideoPlayerNative.defaultProps = defaultProps;
