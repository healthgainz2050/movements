import React from 'react';
import {ExerciseItem} from '../../../../../components/exercise-item';
import {useNavigation} from '@react-navigation/native';

export const ExerciseListItem = ({state, setState, item}) => {
  const sets = item?.sets ? `${item?.sets} Sets ` : '';
  const reps = item?.reps ? `${item?.reps} Reps ` : '';
  const hold = item?.hold ? `${item?.hold} hold ` : '';

  const navigation = useNavigation();
  const subtitle = `${sets}${reps}${hold}`;
  const {selectedExercises} = state;
  const isChecked = selectedExercises?.indexOf(item?.id) !== -1;
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
      onPressCheckbox={() => {
        let updatedExercises = null;
        if (isChecked) {
          updatedExercises = selectedExercises.filter(
            itemId => itemId !== item.id,
          );
        } else {
          if (item?.id) {
            updatedExercises = [...selectedExercises];
            updatedExercises.push(item?.id);
          }
        }
        setState({...state, selectedExercises: updatedExercises});
      }}
      isChecked={isChecked}
      isCheckbox
      description={item?.description}
      item={item}
    />
  );
};
