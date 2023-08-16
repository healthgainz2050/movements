import React, {useCallback} from 'react';
import {Text, Pressable, Box} from 'native-base';
import YoutubeIframe from '../youtube-iframe';
import {VideoPlayerNative} from '../video-player-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {getYouTubeVideoId, getGDriveVideoUrl} from '../../utils';
import {WebView} from 'react-native-webview';
import {styles} from './styles';
import {props, defaultProps} from './props';

export const VideoPlayer = ({uri, onPressSelectVideo, onEndVideo}) => {
  const youtubeVideoId = getYouTubeVideoId(uri);
  const gdriveVideoURL = getGDriveVideoUrl(uri);

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
          style={styles.webView}
        />
      );
    }
    return <VideoPlayerNative uri={uri} onEndVideo={onEndVideoHandler} />;
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
