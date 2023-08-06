import {db} from '../../../Controllers/Firebase';
import {getAllExercises} from '../../../Services/playlist';

export const fetchExercise = async (context) => {
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
    let docRef = await db
      .collection('videos')
      .add({url: props.url, exercise_id: exerciseid});
    let exerciseRef = db.collection('exercises').doc(exerciseid);
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
