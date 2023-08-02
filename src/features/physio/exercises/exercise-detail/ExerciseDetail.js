import React, {useEffect, useState} from 'react';
import {
  Body,
  Left,
  Content,
  List,
  Right,
  ListItem,
  Container,
} from '@native-base';
import {ActivityIndicator, Text, View, Platform} from 'react-native';
import {VideoPlayer} from '../../../Components/VideoPlayer';
import {Cone} from '../../../Components/curve-shape';
import {HeaderBackButton, HeaderTitle} from 'react-navigation-stack';
import {setupListener, unsubscribe} from './actions';

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

  const _onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
    }
  };

  const item = state.doc;
  if (state.dataLoaded) {
    return (
      <Container>
        <Content style={{backgroundColor: 'white'}}>
          <VideoPlayer
            uri={item.video_url}
            _onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
            onPressSelectVideo={() =>
              props.navigation.navigate('AddVideo', {
                id: state.doc_id,
              })
            }
          />
          <List>
            <ListItem>
              <Left>
                <Text
                  note
                  style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                  Exercise
                </Text>
              </Left>
              <Body>
                <Text>{item?.name}</Text>
              </Body>
              <Right></Right>
            </ListItem>
            {item.reps ? (
              <ListItem>
                <Left>
                  <Text
                    note
                    style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                    Reps
                  </Text>
                </Left>
                <Body>
                  <Text>{item.reps}</Text>
                </Body>
                <Right></Right>
              </ListItem>
            ) : null}
            {item.sets ? (
              <ListItem>
                <Left>
                  <Text
                    note
                    style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                    Sets
                  </Text>
                </Left>
                <Body>
                  <Text>{item.sets}</Text>
                </Body>
                <Right></Right>
              </ListItem>
            ) : null}
            {item.hold ? (
              <ListItem>
                <Left>
                  <Text
                    note
                    style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                    Hold
                  </Text>
                </Left>
                <Body>
                  <Text>{item.hold}</Text>
                </Body>
                <Right></Right>
              </ListItem>
            ) : null}
            {item.description ? (
              <ListItem>
                <Left>
                  <Text
                    note
                    style={{width: 110, fontWeight: 'bold', color: '#000'}}>
                    Description
                  </Text>
                </Left>
                <Body>
                  <Text>{item.description}</Text>
                </Body>
                <Right></Right>
              </ListItem>
            ) : null}
          </List>
        </Content>
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

ExerciseDetail.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => (
      <HeaderTitle title={navigation?.state?.params?.item?.name} />
    ),
    headerLeft: () => {
      return (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          label={'Back'}
          backTitleVisible={Platform.OS == 'ios' ? true : false}
        />
      );
    },
    headerRight: () => <Cone />,
  };
};

export default ExerciseDetail;
