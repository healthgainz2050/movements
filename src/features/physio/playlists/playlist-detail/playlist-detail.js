import React from 'react';
import {FlatList, Container, Text} from 'native-base';
import {ExerciseItem} from '../../../../components/exercise-item';

export const PlayListDetail = ({navigation}) => {
  const exerciseListItem = item => {
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
      <Text>Exercises ({exercises?.length})</Text>
      <FlatList data={exercises} render={exerciseListItem} />
    </Container>
  );
};

// PlayListDetail.navigationOptions = ({navigation}) => {
//   return {
//     headerTitle: () => (
//       <HeaderTitle title={navigation?.state?.params?.playlist?.playlistName} />
//     ),
//     headerLeft: () => {
//       return (
//         <HeaderBackButton
//           onPress={() => navigation.goBack()}
//           label={'Back'}
//           backTitleVisible={Platform.OS == 'ios' ? true : false}
//         />
//       );
//     },
//     headerRight: () => <Cone />,
//   };
// };
