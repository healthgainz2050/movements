import React, {useEffect, useState} from 'react';
import {Center, Container} from 'native-base';
import {ActivityIndicator, Text} from 'react-native';
import {VideoPlayer} from '../../../../../components/video-player';
import {setupListener} from './actions';

function ExerciseDetailView(props) {
  const [state, setState] = useState({
    doc: {},
    doc_id: null,
    collectionID: 'exercises',
    dataLoaded: false,
  });

  const id = props?.navigation?.state?.params?.item?.id;

  useEffect(() => {
    if (!state.dataLoaded) {
      setState({...state, doc_id: id});
      setupListener(id, state, setState);
    }
    return () => {
      // unsubscribe("exercises");
    };
  }, []);

  const _onPlaybackStatusUpdate = playbackStatus => {
    if (playbackStatus.didJustFinish) {
    }
  };

  const item = state.doc;
  if (state.dataLoaded) {
    return (
      <Container>
        <Center style={{backgroundColor: 'white'}}>
          <VideoPlayer
            uri={item.video_url}
            _onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
            onPressSelectVideo={() =>
              props.navigation.navigate('AddVideo', {
                id: state.doc_id,
              })
            }
          />
          <Text note style={{width: 110, fontWeight: 'bold', color: '#000'}}>
            Exercise
          </Text>

          <Text>{item?.name}</Text>

          {item.reps ? (
            <>
              <Text
                note
                style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                Reps
              </Text>

              <Text>{item.reps}</Text>
            </>
          ) : null}
          {item.sets ? (
            <>
              <Text
                note
                style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                Sets
              </Text>

              <Text>{item.sets}</Text>
            </>
          ) : null}
          {item.hold ? (
            <>
              <Text
                note
                style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                Hold for
              </Text>

              <Text>{item.hold}</Text>
            </>
          ) : null}
          {item.description ? (
            <>
              <Text
                note
                style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                Description
              </Text>
            </>
          ) : null}
        </Center>
      </Container>
    );
  }
  return (
    <ActivityIndicator
      style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        zIndex: 2,
        translateY: -10,
      }}
      size="large"
      color={'grey'}
    />
  );
}

const ExerciseDetail = ExerciseDetailView;

export default ExerciseDetail;
