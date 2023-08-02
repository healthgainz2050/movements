import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import YoutubeIframe from '../youtube-iframe';
import {VideoPlayerNative} from '../video-player-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getYouTubeVideoId, getGDriveVideoUrl} from '../../utils';
// import {WebView} from 'react-native-webview';
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
        // <WebView
        //   source={{
        //     html: gdriveVideoURL,
        //   }}
        //   style={styles.webView}
        // />
        <View />
      );
    }
    return <VideoPlayerNative uri={uri} onEndVideo={onEndVideoHandler} />;
  };
  if (uri) {
    return <React.Fragment>{renderVideoPlayer()}</React.Fragment>;
  } else {
    return (
      <View style={styles.video}>
        <TouchableOpacity
          style={styles.videoSelectionButton}
          onPress={onPressSelectVideo}>
          <Ionicons name="md-film" size={32} color="grey" />
          <Text>Select Video</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

VideoPlayer.props = props;
VideoPlayer.defaultProps = defaultProps;
