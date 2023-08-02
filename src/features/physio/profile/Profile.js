import React from 'react';
import {Button} from 'react-native';
import FirebaseForm from '../../Components/FirebaseForm';
import {HeaderTitle} from '../../Components/HeaderTitle';

const fields = require('../../data/physioProfile.json');

export const Profile = () => {
  Profile.navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => <HeaderTitle title={'Profile'} />,
      headerRight: (
        <Button onPress={navigation.getParam('submitForm')} title="Submit" />
      ),
    };
  };

  return (
    <FirebaseForm
      title="Profile"
      fields={fields}
      collection={'testing_UserProfile'}
    />
  );
};
