import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native';

export const SignOutButton = () => {
  const signOut = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return <Button onPress={signOut} title={'Sign Out'} />;
};
