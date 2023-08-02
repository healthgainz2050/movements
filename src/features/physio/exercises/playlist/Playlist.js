import React, {useState} from 'react';
import SubscribeToCollection from '../../../HOC/List';
import {Body, Content, List, ListItem} from '@native-base';
import {Platform, Text, View} from 'react-native';
import {VideoPlayer} from '../../../Components/VideoPlayer';
import {auth} from '../../../Controllers/Firebase';
import {HeaderBackButton} from 'react-navigation-stack';
import {HeaderTitle} from '../../../Components/HeaderTitle';
import {setVideo, updateAnalytics, _onPlaybackStatusUpdate} from './actions';

function ExerciseListView(props) {
  const [state, setState] = useState({
    item: {video_url: null},
  });

  return (
    <View>
      <Content style={{backgroundColor: 'white'}}>
        <VideoPlayer
          uri={state.item.video_url}
          _onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
        />
        <List
          dataArray={props.data}
          renderRow={(item) => (
            <ListItem
              noIndent
              onPress={() => {
                updateAnalytics(item.id, item.viewed);
                setVideo(item, setState);
              }}>
              <Body>
                <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
                <Text note numberOfLines={1}>
                  Reps {item.reps} Sets {item.sets} Hold {item.hold}
                </Text>
              </Body>
            </ListItem>
          )}
        />
      </Content>
    </View>
  );
}

const Exercises = SubscribeToCollection('exercises')(ExerciseListView);

Exercises.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => (
      <HeaderTitle title={navigation?.state?.params?.item?.name} />
    ),
    headerBackTitle: 'Sign Out',
    headerLeft: () => (
      <HeaderBackButton
        onPress={async () => {
          let config = navigation.getParam('config');
          await auth.signOut();
          navigation.navigate('Login');
        }}
        backTitleVisible={Platform.OS == 'ios' ? true : false}
      />
    ),
  };
};

export default Exercises;
