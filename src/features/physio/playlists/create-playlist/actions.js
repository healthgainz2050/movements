import {
  getAllExercises,
  getAllPlaylists,
  createPlaylist,
} from '../../../../services/firebase';
import Toast from 'react-native-toast-message';
import {generateUUID} from '../../../../utils/uuid-generator';
import {lowerCase} from '../../../../utils';

export const fetchExercise = async (context, setState, state) => {
  try {
    const createdBy = context?.user?.email;
    const allExercises = await getAllExercises(createdBy);

    setState({...state, allExercises});
    context.updateState({allExercises});
  } catch (error) {
    console.log('@@@ fetchExercise error', error);
  }
};

export const onCreatePlaylist = async (
  allExercises,
  state,
  context,
  navigation,
) => {
  const {selectedExercises, playlistName} = state;
  if (playlistName === '') {
    Toast.show({
      type: 'error',
      text1: 'Playlist name is required',
      autoHide: true,
      visibilityTime: 2000,
    });
    return;
  }
  if (selectedExercises.length === 0) {
    Toast.show({
      type: 'error',
      text1: 'Please select at least one exercise to create a playlist',
      autoHide: true,
      visibilityTime: 2000,
    });
    return;
  }
  const selectedPlaylistItems = [];
  allExercises.forEach(item => {
    if (selectedExercises.indexOf(item.id) !== -1) {
      selectedPlaylistItems.push(item);
    }
  });

  const playlist = {
    id: generateUUID(),
    playlistName,
    exercises: selectedPlaylistItems,
    createdBy: lowerCase(context?.user?.email),
  };

  await createPlaylist(playlist);
  const allPlaylists = await getAllPlaylists(context?.user?.email);
  Toast.show({
    type: 'success',
    text1: 'Playlist Created Successfully',
    autoHide: true,
    visibilityTime: 2000,
  });
  context.updateState({playlists: allPlaylists});
  navigation.goBack();
};
