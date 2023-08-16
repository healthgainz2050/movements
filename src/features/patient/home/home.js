import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, AppState} from 'react-native';
import {Container, Box, Heading} from 'native-base';
import {VideoPlayer} from '../../../components/video-player';
import {Playlist} from './playlist';
import {Spinner} from '../../../components/spinner';
import GlobalContext from '../../../services/context/globalContext';
import {
  reportAppUsageTime,
  getPlaylistAssignedToPatient,
} from '../../../services/firebase';
import {AppointmentStatus} from './appointment-status/appointment-status';

import {styles} from './styles';
import {downloadFile} from './actions';
import * as Progress from 'react-native-progress';

export const Home = () => {
  const [downloadProgress, setDownloadProgress] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentVideoUri, setCurrentVideoUri] = useState(
    'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  );
  const [actualUri, setActualUri] = useState(null);

  const timeStart = useRef(0);
  const timeEnd = useRef(0);
  const [state, setState] = useState({
    playlist: null,
    isLoadingPlaylist: false,
    endedVideos: [],
  });
  const {playlist, isLoadingPlaylist, endedVideos} = state;

  const appState = useRef(AppState.currentState);
  const context = useContext(GlobalContext);
  const {email, uid, playlistId} = context?.user;
  useEffect(() => {
    if (appState?.current === 'active') {
      timeStart.current = new Date();
    }
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState?.current?.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        timeStart.current = new Date();
        return;
      } else if (appState?.current !== 'unknown') {
        timeEnd.current = new Date();
        var difference = timeEnd.current - timeStart.current;
        reportAppUsageTime(uid, email, timeStart.current, difference);
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription?.remove();
    };
  });

  const fetchData = useCallback(async () => {
    setState({...state, isLoadingPlaylist: true});
    if (playlistId) {
      const playlist = await getPlaylistAssignedToPatient(playlistId);
      setState({
        ...state,
        isLoadingPlaylist: false,
        playlist,
      });
      downloadFile(
        playlist?.exercises[0]?.video_url,
        setDownloadProgress,
        setIsDownloading,
        setCurrentVideoUri,
      );
    } else {
      setState({...state, isLoadingPlaylist: false});
    }
  }, [email, uid, playlistId]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container>
        <Heading
          size="xl"
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 8,
          }}>
          Welcome {context?.user?.displayName}
        </Heading>
        <AppointmentStatus user={context?.user} />
        {isLoadingPlaylist ? (
          <Spinner />
        ) : playlist?.exercises ? (
          <Box>
            <VideoPlayer
              uri={currentVideoUri}
              onEndVideo={uri => {
                const updatedEndedVideos = [...endedVideos, actualUri];
                setState({...state, endedVideos: updatedEndedVideos});
              }}
            />
            <Progress.Bar
              progress={endedVideos.length / playlist?.exercises.length}
              width={null}
              height={15}
              style={{marginHorizontal: 8, marginVertical: 10}}
            />
            <Playlist
              data={playlist?.exercises}
              onPressVideo={uri => {
                setActualUri(uri);
                downloadFile(
                  uri,
                  setDownloadProgress,
                  setIsDownloading,
                  setCurrentVideoUri,
                );
              }}
              endedVideos={endedVideos}
            />
          </Box>
        ) : (
          <View style={styles.row}>
            <Heading size="lg" mh="10">
              You don't have any exercise at the moment please contact to your
              admin
            </Heading>
          </View>
        )}
      </Container>
    </>
  );
};
