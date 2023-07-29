import {Alert} from 'react-native';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../../utils';

// export const signInWithGoogleAsync = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//   } catch (error) {
//     console.log('@@@@ userInfo error', error);
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//     } else {
//     }
//   }
// };

export const handleLogin = async (form, context) => {
  const {email, password} = form;
  try {
    await auth().signInWithEmailAndPassword(lowerCase(email), password);
  } catch (error) {
    let errorMessage = error.message;
    Alert.alert('Alert', errorMessage);
  }
};

// export const googleConfigure = () => {
//   GoogleSignin.configure({
//     scopes: ['email'],
//     webClientId:
//       '738647779677-ukpinbt2orlq170l92kb3au6ostc0t8m.apps.googleusercontent.com',
//     offlineAccess: true,
//   });
// };
