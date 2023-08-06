import React from 'react';
import {Content, ListItem, List, Container} from '@native-base';
import {Text, View, Platform} from 'react-native';
import {ExerciseItem} from '../../../Components/exercise-item';
import {HeaderBackButton} from 'react-navigation-stack';
import {HeaderTitle} from '../../../Components/HeaderTitle';
import {Cone} from '../../../Components/curve-shape';

export const PlayListDetail = ({navigation}) => {
  const exerciseListItem = (item) => {
    const sets = item?.sets ? `${item?.sets} Sets ` : '';
    const reps = item?.reps ? `${item?.reps} Reps ` : '';
    const hold = item?.hold ? `${item?.hold} hold ` : '';

    const subtitle = `${sets}${reps}${hold}`;
    return (
      <ExerciseItem
        onPress={() =>
          navigation.navigate('ExerciseDetail', {
            name: item?.name,
            item: item,
          })
        }
        title={item?.name}
        subtitle={subtitle}
      />
    );
  };

  const playlist = navigation.getParam('playlist');
  const {exercises} = playlist;
  return (
    <Container>
      <Content>
        <ListItem itemDivider>
          <Text>Exercises ({exercises?.length})</Text>
        </ListItem>
        <List dataArray={exercises} renderRow={exerciseListItem} />
      </Content>
    </Container>
  );
};

PlayListDetail.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => (
      <HeaderTitle title={navigation?.state?.params?.playlist?.playlistName} />
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
