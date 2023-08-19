import React, {useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'native-base';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import GlobalContext from '../services/context/globalContext';

export const SignOutButton = () => {
  const context = useContext(GlobalContext);
  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    context.updateState({});
  };
  return (
    <Button onPress={signOut} variant="link" mr="5" _text={{color: '#007aff'}}>
      Sign Out
    </Button>
  );
};
