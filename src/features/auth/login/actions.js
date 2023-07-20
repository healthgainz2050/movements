import {Alert} from 'react-native';
import {auth, db} from './../../Controllers/Firebase';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import {lowerCase} from '../../utils';

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

export const handleLogin = async (form, navigation, context) => {
  const {email, password} = form;
  try {
    let userData = await auth.signInWithEmailAndPassword(
      lowerCase(email),
      password,
    );
    let user = userData?.user;
    let getuser = await db.collection('users').doc(user.uid).get();
    let profileData = {...getuser?.data(), uid: user.uid};
    context.updateState({user: profileData});
    if (profileData?.physio) {
      navigation.navigate('Patients', {user: profileData});
    } else {
      navigation.navigate('Playlist', {user: profileData});
    }
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
