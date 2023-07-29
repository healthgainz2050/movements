import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TextInput,
  Button as RNButton,
  Image,
  View,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {NBButton} from '../../../components/nb-button';
import {NBInput} from '../../../components/nb-input';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {styles} from './styles';
import {images} from '../../../assets';
import GlobalContext from '../../../services/context/globalContext';
import {handleLogin, googleConfigure, signInWithGoogleAsync} from './actions';

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

      <NBInput
        value={form.email}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={email => setForm({...form, email})}
      />
      <NBInput
        value={form.password}
        placeholder="Password"
        secureTextEntry
        onChangeText={password => setForm({...form, password})}
      />

      <NBButton label="Sign In" onPress={() => handleLogin(form, context)} />

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
