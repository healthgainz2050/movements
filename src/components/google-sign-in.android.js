import React, {useContext} from 'react';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {Platform, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import config from '../../android/app/google-services.json';
import GlobalContext from '../services/context/globalContext';
GoogleSignin.configure({
  webClientId: config.client[0].oauth_client[0].client_id,
});

export const GoogleSignIn = () => {
  const context = useContext(GlobalContext);
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    Alert.alert('Please confirm your account', 'Are you a physiotherapist?', [
      {
        text: 'NO',
        onPress: () => {
          signIn();
        },
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          context.updateState({isPhysio: true});
          signIn();
        },
      },
    ]);
    return;
  };

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return Platform.OS === 'android' ? (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
      title="Sign in with Google"
      style={styles.googleBtn}
    />
  ) : null;
};

const styles = {
  googleBtn: {
    width: '100%',
    marginTop: 5,
  }
};
