import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {lowerCase} from '../../../utils';


export const handleLogin = async (form, context) => {
  const {email, password} = form;
  try {
    await auth().signInWithEmailAndPassword(lowerCase(email), password);
  } catch (error) {
    let errorMessage = error.message;
    Alert.alert('Alert', errorMessage);
  }
};
