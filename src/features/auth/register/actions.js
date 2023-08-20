import {Alert, Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../../utils';

export const handleSignup = async (form, context) => {
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
    context.updateState({user: userInfo});
    let signup = await auth().createUserWithEmailAndPassword(
      lowerCase(form.email),
      form.password,
    );
    let uid = signup.user.uid;
    let userInfo = form;
    delete userInfo['password'];

    context.updateState({user: userInfo, isPhysio: form?.physio});
    await firestore().collection('users').doc(uid).set(userInfo);
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'That email address is already in use!';
    }

    if (error.code === 'auth/invalid-email') {
      errorMessage = 'That email address is invalid!';
    }

    Alert.alert('Alert', errorMessage);
  }
};

export const openUrl = () => {
  Linking.openURL('https://healthgainz.com/terms-of-service/');
};
