import React from 'react';
import {Button} from 'react-native';
import {addSentimentToExercise} from '../../../../services/firebase';
import {FlatList, Container} from 'native-base';
import {ExerciseItem} from '../../../../components/exercise-item';
import {HeaderTitle} from '../../../../components/header-title';
import {props, defaultProps} from './props';

const PlaylistItem = ({item, onPressVideo, endedVideos}) => {
  const exerciseDetail = `${item.reps ? `Reps ${item.reps}  ` : ''}
  ${item.sets ? `Sets ${item.sets}  ` : ''}
  ${item.hold ? `Hold ${item.hold}  ` : ''}`;
  return (
    <ExerciseItem
      onPress={() => onPressVideo(item?.video_url)}
      title={item?.name}
      subtitle={exerciseDetail}
      isWithFeedback={endedVideos.indexOf(item?.video_url) !== -1}
      addSentimentToExercise={addSentimentToExercise}
      item={item}
    />
  );
};

export const Playlist = ({endedVideos, onPressVideo, data}) => {
  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <PlaylistItem
              item={item}
              endedVideos={endedVideos}
              onPressVideo={onPressVideo}
            />
          );
        }}
      />
    </Container>
  );
};

Playlist.props = props;
Playlist.defaultProps = defaultProps;

Playlist.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'Playlist'} />,
    headerRight: (
      <Button onPress={() => navigation.navigate('AddExercise')} title="Add" />
    ),
  };
};
