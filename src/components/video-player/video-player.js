import React, {useCallback, useState} from 'react';
import {Text, Pressable, Box, HStack} from 'native-base';
import YoutubeIframe from '../youtube-iframe';
import {VideoPlayerNative} from '../video-player-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getYouTubeVideoId, getGDriveVideoUrl, getDropBoxUrl} from '../../utils';
import {WebView} from 'react-native-webview';
import {styles} from './styles';
import {props, defaultProps} from './props';
import {ActivityIndicator} from 'react-native';

export const VideoPlayer = ({
  uri,
  onPressSelectVideo,
  onEndVideo,
  isClientHome,
}) => {
  const [videoState, setVideoState] = useState({
    isLoading: true,
    loadingProgress: 0,
  });
  const youtubeVideoId = getYouTubeVideoId(uri);
  const gdriveVideoURL = getGDriveVideoUrl(uri);
  const dropboxURL = getDropBoxUrl(uri);

  const onEndVideoHandler = useCallback(() => {
    if (onEndVideo) {
      onEndVideo(uri);
    }
  }, [uri, onEndVideo]);

  const renderVideoPlayer = () => {
    if (youtubeVideoId) {
      return (
        <YoutubeIframe
          videoId={youtubeVideoId}
          videoUri={uri}
          onEndVideo={onEndVideo}
        />
      );
    } else if (gdriveVideoURL) {
      return (
        <WebView
          source={{
            html: gdriveVideoURL,
          }}
        />
      );
    } else if (dropboxURL) {
      return (
        <>
          <WebView
            source={{
              uri: dropboxURL,
            }}
            onLoadStart={() => {
              console.log('load start');
            }}
            onLoadProgress={({nativeEvent}) => {
              console.log('load onLoadProgress');
              setVideoState({
                ...videoState,
                loadingProgress: nativeEvent?.progress,
                isLoading: nativeEvent?.progress !== 1,
              });
            }}
            onLoadEnd={() => {
              setVideoState({...videoState, isLoading: false});
              console.log('load end');
            }}
          />
          <HStack p="5">
            {videoState.isLoading && <ActivityIndicator />}
            {videoState.isLoading && (
              <Text ml="5">
                Video is loading...{' '}
                {Math.round(videoState.loadingProgress * 100)}%
              </Text>
            )}
          </HStack>
        </>
      );
    }
    return (
      <VideoPlayerNative
        uri={uri}
        onEndVideo={onEndVideoHandler}
        isClientHome={isClientHome}
      />
    );
  };
  if (uri) {
    return <React.Fragment>{renderVideoPlayer()}</React.Fragment>;
  } else {
    return (
      <Box style={styles.video} mb="5">
        <Pressable
          style={styles.videoSelectionButton}
          onPress={onPressSelectVideo}>
          <MaterialIcons name={'movie'} size={32} color={'black'} />
          <Text p="2">Select Video</Text>
        </Pressable>
      </Box>
    );
  }
};

VideoPlayer.props = props;
VideoPlayer.defaultProps = defaultProps;
