import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {lowerCase} from '../../utils';
export const byPropKey = (key, value) => ({
  [key]: value,
});

export const PostFormData = path => WrappedComponent => {
  class HOC extends React.Component {
    state = {};

    handleChange = item => {
      this.setState(item);
    };

    submitForm = async () => {
      try {
        let data = this.state;
        data.physioEmail = lowerCase(auth().currentUser.email);
        let docRef = await firestore().collection(path).add(data);
        this.setState({submitted: docRef.id});
        this.props.navigation.goBack();
      } catch (error) {
        // console.log(error);
      }
    };

    render() {
      return (
        <WrappedComponent
          handleChange={this.handleChange}
          submitForm={this.submitForm}
          item={this.state}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};
