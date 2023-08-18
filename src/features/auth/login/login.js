import React, {useState, useEffect, useContext} from 'react';
import {Text, View, Platform} from 'react-native';
import {FormControl, Stack} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {NBButton} from '../../../components/nb-button';
import {NBInput} from '../../../components/nb-input';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {styles} from './styles';
import {images} from '../../../assets';
import GlobalContext from '../../../services/context/globalContext';
import {handleLogin, googleConfigure, signInWithGoogleAsync} from './actions';
import {isValidForm, isValidEmail} from '../../../utils';

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 0,
    scale: 0,
  },
};
export const Login = ({navigation}) => {
  const [form, setForm] = useState({
    email: null,
    username: null,
    password: null,
    success: null,
    physio: false,
    authChecked: false,
    config: null,
  });

  // useEffect(() => {
  //   // googleConfigure();
  // }, []);
  const isValid =
    isValidForm({email: form.email, password: form.password}) &&
    isValidEmail(form.email);
  const context = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeInLeft"
        iterationCount={1}
        direction="alternate"
        source={images.app_logo}
        style={styles.image}
      />
      <Text style={styles.welcomeMessage}>Welcome!</Text>
      <Text style={styles.signInMessage}> Sign in to get started!</Text>

      <FormControl mb="5" isInvalid={form.email && !isValidEmail(form.email)}>
        <Stack>
          <NBInput
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={email => setForm({...form, email})}
            mb="0"
          />
        </Stack>
        <FormControl.ErrorMessage>
          Enter a valid email address.
        </FormControl.ErrorMessage>
      </FormControl>
      <NBInput
        value={form.password}
        placeholder="Password"
        secureTextEntry
        onChangeText={password => setForm({...form, password})}
      />

      <NBButton
        label="Sign In"
        onPress={() => handleLogin(form, context)}
        disabled={!isValid}
      />

      {Platform.OS === 'android' ? (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogleAsync}
          title="Sign In With Google"
          style={styles.googleBtn}
        />
      ) : null}
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('ForgotPassword')}>
        Forgot your password?
      </Text>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('SignUp')}>
        Don't have account? Tap here to Sign Up
      </Text>
    </View>
  );
};

Login.navigationOptions = () => {
  return {
    title: null,
    headerShown: false,
  };
};
