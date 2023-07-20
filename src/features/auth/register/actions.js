import {Alert, Linking} from 'react-native';
import {auth, db} from '../../Controllers/Firebase';
import {lowerCase} from '../../utils';
import Toast from 'react-native-toast-message';

export const handleSignup = async (form, navigation, context) => {
  if (form.displayName === '' || !form.displayName) {
    Toast.show({
      type: 'info',
      text1: 'Please enter your name to create an account',
      autoHide: true,
      visibilityTime: 2000,
    });

    return;
  }
  if (form.email === '' || !form.email) {
    Toast.show({
      type: 'info',
      text1: 'Please enter your email to create an account',
      autoHide: true,
      visibilityTime: 2000,
    });

    return;
  }

  if (form.password === '' || !form.password) {
    Toast.show({
      type: 'info',
      text1: 'Please enter your password to create an account',
      autoHide: true,
      visibilityTime: 2000,
    });

    return;
  }
  try {
    let signup = await auth.createUserWithEmailAndPassword(
      lowerCase(form.email),
      form.password,
    );
    let uid = signup.user.uid;
    let userInfo = form;
    userInfo['password'] = null;
    let createuser = await db.collection('users').doc(uid).set(userInfo);
    console.log('@@@@ createdUser', createuser);
    context.updateState({user: userInfo});
    if (form.physio) {
      navigation.navigate('Patients');
    } else {
      navigation.navigate('Playlist', {
        name: form?.displayName,
        item: userInfo,
      });
    }
  } catch (error) {
    let errorMessage = error.message;

    Alert.alert('Alert', errorMessage);
  }
};

export const openUrl = () => {
  Linking.openURL('https://healthgainz.com/terms-of-service/');
};
