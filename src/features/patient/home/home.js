import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, AppState} from 'react-native';
import {Container, Box, Heading, Text} from 'native-base';
import {VideoPlayer} from '../../../components/video-player';
import {Playlist} from './playlist';
import {Spinner} from '../../../components/spinner';
import GlobalContext from '../../../services/context/globalContext';
import {
  reportAppUsageTime,
  getPlaylistAssignedToPatient,
  getPatient,
} from '../../../services/firebase';
import {AppointmentStatus} from './appointment-status/appointment-status';
import {downloadFile} from './actions';
import * as Progress from 'react-native-progress';
import lodash from 'lodash';

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
  const {email, uid} = context?.user;

  useEffect(() => {
    if (appState?.current === 'active') {
      timeStart.current = new Date();
    }
  }, []);

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
  }, []);

  const fetchData = useCallback(async () => {
    setState({...state, isLoadingPlaylist: true});
    const patientInstance = await getPatient(email);
    const patientPlaylistId = patientInstance?.playlistId;
    if (patientPlaylistId) {
      const playlist = await getPlaylistAssignedToPatient(patientPlaylistId);
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
  }, [email]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container maxWidth="100%" alignItems="center">
        <Text fontSize="lg" pt="2" bold>
          Welcome {lodash.capitalize(context?.user?.displayName)}
        </Text>
        <AppointmentStatus user={context?.user} />
        {isLoadingPlaylist ? (
          <Spinner />
        ) : playlist?.exercises ? (
          <Box width="100%">
            <VideoPlayer
              uri={currentVideoUri}
              isClientHome
              onEndVideo={uri => {
                const updatedEndedVideos = [...endedVideos, actualUri];
                setState({...state, endedVideos: updatedEndedVideos});
              }}
            />
            <Box bg="green.400" mr="2" ml="2" rounded="2">
              <Text p="2">Progress of your current session</Text>
              <Progress.Bar
                progress={endedVideos.length / playlist?.exercises.length}
                width={null}
                height={25}
                style={{marginHorizontal: 8, marginVertical: 10}}
              />
            </Box>

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
          <Text fontSize="sm" p="5" textAlign="center">
            You don't have any exercise at the moment please contact to your
            admin
          </Text>
        )}
      </Container>
    </>
  );
};
