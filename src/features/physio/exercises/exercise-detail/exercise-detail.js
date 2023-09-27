import React, {useEffect, useState} from 'react';
import {Text, HStack, Container, Divider, Box} from 'native-base';
import {ActivityIndicator, View, Platform} from 'react-native';
import {VideoPlayer} from '../../../../components/video-player';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export const ExerciseDetail = props => {
  const [state, setState] = useState({
    doc: {},
    dataLoaded: false,
  });
  const navigation = useNavigation();
  const route = useRoute();
  const id = route?.params?.item?.id;

  useEffect(() => {
    let subscriber;
    try {
      subscriber = firestore()
        .collection('exercises')
        .doc(id)
        .onSnapshot(documentSnapshot => {
          let data = documentSnapshot?.data();
          if (data) {
            setState({
              doc: {
                id,
                ...data,
              },
              dataLoaded: true,
            });
          }
        });
    } catch (error) {
      console.log('@@@ exercise detail error is', error);
    }

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [id]);
  const item = state.doc;
  if (state.dataLoaded) {
    return (
      <Container maxWidth="100%" p="8">
        <Box w="100%" h="50%">
          <VideoPlayer
            uri={item?.video_url}
            onPressSelectVideo={() =>
              navigation.navigate('AddVideo', {
                id,
              })
            }
          />
        </Box>

        <HStack>
          <Text bold width={'40%'}>
            Exercise
          </Text>
          <Text>{item?.name}</Text>
        </HStack>
        <Divider m="2" />
        {item.reps ? (
          <HStack>
            <Text bold width={'40%'}>
              Reps
            </Text>
            <Text>{item.reps}</Text>
          </HStack>
        ) : null}
        <Divider m="2" />
        {item.sets ? (
          <HStack>
            <Text bold width={'40%'}>
              Sets
            </Text>
            <Text>{item.sets}</Text>
          </HStack>
        ) : null}
        <Divider m="2" />
        {item.hold ? (
          <HStack>
            <Text bold width={'40%'}>
              Hold for
            </Text>
            <Text>{item.hold}</Text>
          </HStack>
        ) : null}
        <Divider m="2" />
        {item.description ? (
          <HStack>
            <Text bold width={'40%'}>
              Description
            </Text>
            <Text>{item.description}</Text>
          </HStack>
        ) : null}
        <Divider m="2" />
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
};
