import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../utils';
/**
 * this api returns all excercises created for by a specific person
 * patientEmail (is the person for which we have created the excercises)
 * physioEmail (is the person for who have created the excercises)
 */

const getAllExercises = async createdBy => {
  let exercisesDocs = await firestore()
    .collection('003_exercises')
    .where('physioEmail', '==', lowerCase(createdBy))
    .get();
  const exercises = [];
  exercisesDocs?.forEach(function (doc) {
    exercises.push({...doc.data(), id: doc.id});
  });
  return exercises;
};

/**
 * this api will create a playlist
 */

const createPlaylist = async playlist => {
  let createdPlaylist = await firestore().collection('playlists').add(playlist);
  return createdPlaylist;
};

/**
 * this api will get all playlists
 */

const getAllPlaylists = async createdBy => {
  try {
    let playlistDocs = await firestore()
      .collection('playlists')
      .where('createdBy', '==', lowerCase(createdBy))
      .get();
    const playlists = [];
    playlistDocs?.forEach(function (doc) {
      playlists.push(doc.data());
    });
    return playlists;
  } catch (error) {
    return null;
  }
};

/**
 * this will assign a playlist to users
 */

const assignPlaylistToPatient = async (patientEmail, playlistId) => {
  try {
    await firestore()
      .collection('users')
      .where('email', '==', lowerCase(patientEmail))
      .get()
      .then(docs => {
        docs.forEach(function (doc) {
          doc.ref.update({
            playlistId,
          });
        });
      });
  } catch (error) {
    console.log('@@@ error in updating playlist id', error);
  }

  await firestore()
    .collection('002_patients')
    .where('patientEmail', '==', lowerCase(patientEmail))
    .get()
    .then(docs => {
      docs.forEach(function (doc) {
        doc.ref.update({
          playlistId,
        });
      });
    });
};

const getPlaylistAssignedToPatient = async playlistId => {
  try {
    let playlistDocs = await firestore()
      .collection('playlists')
      .where('id', '==', playlistId)
      .get();

    var playlist = [];
    playlistDocs?.forEach(function (doc) {
      playlist.push(doc.data());
    });
    return playlist[0];
  } catch (error) {
    console.log('error in getting playlist', error);
    return [];
  }
};

export {
  getAllExercises,
  createPlaylist,
  getAllPlaylists,
  assignPlaylistToPatient,
  getPlaylistAssignedToPatient,
};

export default {
  getAllExercises,
  createPlaylist,
  getAllPlaylists,
  assignPlaylistToPatient,
  getPlaylistAssignedToPatient,
};
