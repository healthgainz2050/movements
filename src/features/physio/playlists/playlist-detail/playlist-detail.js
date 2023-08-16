import React from 'react';
import {FlatList, Container, Text} from 'native-base';
import {ExerciseItem} from '../../../../components/exercise-item';
import {useNavigation, useRoute} from '@react-navigation/native';

export const PlayListDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const exerciseListItem = ({item}) => {
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
        variant="full"
        title={item?.name}
        subtitle={subtitle}
      />
    );
  };

  const {playlist} = route.params;
  const {exercises} = playlist;
  return (
    <Container maxWidth="100%" p="5">
      <Text mb="2">Exercises ({exercises?.length})</Text>
      <FlatList data={exercises} renderItem={exerciseListItem} />
    </Container>
  );
};
