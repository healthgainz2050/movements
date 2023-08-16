import React, {useContext, useEffect, useState, View} from 'react';
import {Container, Text, FlatList, HStack} from 'native-base';
import {Platform} from 'react-native';
import GlobalContext from '../../../../services/context/globalContext';
import {onCreatePlaylist} from './actions';
import {ExerciseListItem} from './exercise-list-item';
import {getAllExercises} from '../../../../services/firebase';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {NBButton} from '../../../../components/nb-button';
import {NBInput} from '../../../../components/nb-input';

export const CreatePlaylist = ({props}) => {
  const [state, setState] = useState({
    allExercises: [],
    selectedExercises: [],
    playlistName: '',
    error: null,
  });
  const context = useContext(GlobalContext);
  const navigation = useNavigation();

  useEffect(() => {
    let data = {
      patientEmail: 'test email',
      viewed: 0,
      viewComplete: 0,
    };
    // props.handleChange(byPropKey('patientEmail', data.patientEmail));
    // props.handleChange(byPropKey('viewed', 0));
    // props.handleChange(byPropKey('viewComplete', 0));
    if (!context.allExercises || !context?.allExercises?.length == 0) {
      fetchExercise();
    }
  }, []);

  const fetchExercise = async () => {
    try {
      const createdBy = context?.user?.email;
      const allExercises = await getAllExercises(createdBy);

      setState({...state, allExercises});
      context.updateState({allExercises});
    } catch (error) {
      console.log('fetchExercise error', error);
    }
  };

  const {selectedExercises} = state;
  const {allExercises} = context;
  if (allExercises) {
    return (
      <Container maxWidth="100%" height="100%" p="5">
        {allExercises.length ? (
          <>
            <NBInput
              placeholder="Enter Playlist Name"
              onChangeText={text => setState({...state, playlistName: text})}
            />
            <Text bold>Select Exercises ({selectedExercises?.length})</Text>
          </>
        ) : (
          <Text>
            You don't have any list of exercise, please create exercise
          </Text>
        )}
        <FlatList
          data={allExercises}
          renderItem={({item}) => (
            <ExerciseListItem item={item} state={state} setState={setState} />
          )}
        />
        <HStack space={3} justifyContent="center" width="100%">
          <NBButton
            label={
              allExercises.length ? 'Add Another Exercise' : 'Create Exercise'
            }
            onPress={() =>
              navigation.navigate('AddExercise', {
                fetchExercise: fetchExercise,
              })
            }
          />
          <NBButton
            label={'Create Playlist'}
            onPress={() =>
              onCreatePlaylist(allExercises, state, context, navigation)
            }
            disabled={!selectedExercises?.length}
          />
        </HStack>

        <Toast
          position={Platform.OS === 'android' ? 'top' : 'bottom'}
          bottomOffset={20}
        />
      </Container>
    );
  }
  return null;
};
