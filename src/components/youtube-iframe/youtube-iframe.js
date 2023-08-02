import React, {useState, useCallback} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {props, defaultProps} from './props';

export default function YoutubePlayerI({videoId, onEndVideo, videoUri}) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(
    state => {
      console.log('player current state', state, videoUri);
      if (state === 'ended') {
        setPlaying(false);
        onEndVideo(videoUri);
      }
    },
    [videoUri],
  );

  return (
    <YoutubePlayer
      height={230}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
    />
  );
}

YoutubePlayerI.props = props;
YoutubePlayerI.defaultProps = defaultProps;
