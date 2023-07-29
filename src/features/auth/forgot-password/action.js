import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import {lowerCase} from '../../../utils';

export const forgotPassword = async form => {
  if (form.email === '' || !form.email) {
    Toast.show({
      type: 'info',
      text1: 'Please enter your email address to reset password',
      autoHide: true,
      visibilityTime: 2000,
    });

    return;
  } else {
    try {
      await auth().sendPasswordResetEmail(lowerCase(form.email));
      Toast.show({
        type: 'success',
        text1: 'A reset password email has been sent on your email address',
        autoHide: true,
        visibilityTime: 2000,
      });
    } catch (error) {
      let errorMessage = error.message;
      Toast.show({
        type: 'error',
        text1: errorMessage,
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }
};
