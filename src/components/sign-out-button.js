import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'native-base';

export const SignOutButton = () => {
  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <Button onPress={signOut} variant="link" mr="5" _text={{color: '#007aff'}}>
      Sign Out
    </Button>
  );
};
