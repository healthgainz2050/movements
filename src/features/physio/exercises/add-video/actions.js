import {getAllExercises} from '../../../../services/firebase';
import firestore from '@react-native-firebase/firestore';

export const fetchExercise = async context => {
  try {
    const createdBy = context?.user?.email;
    const allExercises = await getAllExercises(createdBy);
    context.updateState({allExercises});
  } catch (error) {
    console.log('error in getting all exercises', error);
  }
};

export const logVideo = async (context, props, setState, state) => {
  try {
    let exerciseid = props.navigation.state.params.id;
    let docRef = await firestore()
      .collection('videos')
      .add({url: props.url, exercise_id: exerciseid});
    let exerciseRef = firestore().collection('exercises').doc(exerciseid);
    let updateExercise = await exerciseRef.update({
      video_url: props.url,
    });

    setState({...state, submitted: docRef.id});
    fetchExercise(context);
    props.navigation.goBack();
  } catch (error) {
    console.log(error);
  }
};
