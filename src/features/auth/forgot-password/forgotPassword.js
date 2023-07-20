import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {styles} from './styles';
import {images} from '../../../assets';
import {forgotPassword} from './action';
import * as Animatable from 'react-native-animatable';
import {Center, Container, Heading, Text} from 'native-base';
import {NBButton} from '../../../components/nb-button';
import {NBInput} from '../../../components/nb-input';

export const ForgotPassword = ({navigation}) => {
  const [form, setForm] = useState({
    email: null,
    username: null,
    password: null,
    success: null,
    physio: false,
    authChecked: false,
  });

  return (
    <Center bg="#fff" height="100%">
      <Container alignItems="center" pb="25%">
        <Animatable.Image
          animation="fadeInLeft"
          iterationCount={1}
          direction="alternate"
          source={images.app_logo}
          style={styles.image}
        />
        <Heading style={styles.welcomeMessage}>Forgot Password?</Heading>
        <Text style={styles.signInMessage}>
          {' '}
          Enter your email to reset password.{' '}
        </Text>
        <NBInput
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={email => setForm({...form, email})}
        />
        <Center>
          <NBButton
            label="Reset Password"
            onPress={() => forgotPassword(form)}
          />
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate('Register')}>
            Don't have account? Tap here to Sign Up
          </Text>
          <Toast position="bottom" bottomOffset={20} />
        </Center>
      </Container>
    </Center>
  );
};

ForgotPassword.navigationOptions = () => {
  return {
    title: null,
    headerShown: false,
  };
};
