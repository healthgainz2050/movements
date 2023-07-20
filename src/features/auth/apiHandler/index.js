import React from 'react';
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
} from 'react-native';

import {getAppointment} from '../../Services/appointments';
import {auth, db, auth2} from './../../Controllers/Firebase';
// import * as Google from 'expo-google-app-auth'
import AlertAsync from './../../Components/react-native-alert-async-master';
import {styles} from './styles';
// import {config} from '../../config';
import {images} from '../../theme';
let authFlag = false;

export default class APIHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      email: 'this.shoaib@gmail.com',
      username: 'Physio@health.com',
      password: '123456',
      success: null,
      physio: false,
      authChecked: false,
    };
  }

  updateAccessToken = (token) => {
    let config = this.state.config;
    config['accessToken'] = token;
    this.setState({config: config});
  };

  isLoggedIn = async (cb, _case, params = {}) => {
    switch (_case) {
      case 1:
        let user = auth.currentUser;
        cb(user, params);
        break;
      case 2:
        await auth.onAuthStateChanged((user) => {
          cb(user, params);
        });
        break;
    }
  };

  changeScreen = async (user) => {
    const {config} = this.state;
    if (user) {
      user.getIdToken().then((res) => {
        this.updateAccessToken(res);
      });
      await db
        .collection('users')
        .doc(user.uid)
        .get()
        .then((data) => {
          let user = data.data();
          if (user.physio) {
            this.props.navigation.navigate('Patients', {config: config, user});
          } else {
            this.props.navigation.navigate('Playlist', {
              name: user.name,
              item: user,
              config: config,
            });
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
    this.setState({authChecked: true});
  };

  componentDidMount = async () => {
    // this.isLoggedIn(this.changeScreen, 2)
    // this.handleLogin();
  };

  forgotPassword = async () => {
    // console.log('forgotPassword');
    if (this.state.email === '') {
      Alert.alert('Error', 'Please enter your email address');
      return;
    } else {
      try {
        await auth.sendPasswordResetEmail(this.state.email); // quickfix.
      } catch (error) {
        let errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      }
    }
  };

  handleLogin = async () => {
    const {email, password} = this.state;

    try {
      let userData = await auth.signInWithEmailAndPassword(email, password);
      let user = userData?.user;

      let getuser = await db.collection('users').doc(user.uid).get();

      // console.log('@@@@XXXX@ user', getuser);
      let profileData = getuser?.data();

      if (profileData?.physio) {
        this.props.navigation.navigate('Patients', {user: profileData});
      } else {
        this.props.navigation.navigate('Playlist', {user: profileData});
      }
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert('Alert', errorMessage);
    }
  };

  googleSignOut = async () => {
    let accessToken = this.state.accessToken;
    // await Google.logOutAsync({ accessToken, ...config });
  };

  signInWithGoogleAsync = async () => {
    // console.log('signInWithGoogleAsync is called');
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '754881726602-eml71t8o4snm4p0p78la8c7pmsc14qjn.apps.googleusercontent.com',
        iosClientId:
          '754881726602-9djttp5q3tb2qvc10hs3ch7es86b3mv1.apps.googleusercontent.com',
        iosStandaloneAppClientId:
          '754881726602-mnq9cd035ak1tgushg10e1c8coe5mrek.apps.googleusercontent.com',
        androidStandaloneAppClientId:
          '754881726602-ombor8iaqa7hjt0j94f1ga7fbiuluofp.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        this.updateAccessToken(result.accessToken);
        return result.accessToken;
      } else {
        // console.log(result);
        return {cancelled: true};
      }
    } catch (e) {
      return {error: true};
    }
  };

  googleSignInCheck = async (firebaseUser, params) => {
    let that = this;
    let googleUser = params.googleUser;
    const {config} = this.state;
    if (!that.isUserEqual(googleUser, firebaseUser)) {
      // if the current user is not the logged in user, check if the current exists
      await db
        .collection('users')
        .where('email', '==', googleUser.user.email)
        .get()
        .then(async (data) => {
          // current user exists
          let user = '';
          data.forEach(function (doc) {
            user = doc.data();
          });
          if (user) {
            // Build Firebase credential with the Google ID token.
            var credential = auth2.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken,
            );
            // Sign in with credential from the Google user.
            auth
              .signInAndRetrieveDataWithCredential(credential)
              .then(function (credential) {
                if (user.physio) {
                  that.props.navigation.navigate('Patients', {
                    config: config,
                    user,
                  });
                } else {
                  that.props.navigation.navigate('Playlist', {
                    name: user.name,
                    item: user,
                    config: config,
                  });
                }
              })
              .catch(function (error) {
                // console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          }
          // current user does not exits
          else {
            await AlertAsync(
              '',
              'Are you a Healthcare Professional ?',
              [
                {text: 'Yes', onPress: () => that.setState({physio: true})},
                {text: 'No', onPress: () => Promise.resolve('no')},
              ],
              {
                cancelable: false,
              },
            );
            // Build Firebase credential with the Google ID token.
            var credential = auth2.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken,
            );
            // Sign in with credential from the Google user.
            auth
              .signInAndRetrieveDataWithCredential(credential)
              .then(async function (credential) {
                let user = credential.user;
                let uid = user.uid;
                let name = user.displayName;
                let userInfo = {
                  email: user.email,
                  password: '',
                  name: name,
                  dob: null,
                  physio: that.state.physio,
                };
                userInfo['password'] = null;
                let createuser = await db
                  .collection('users')
                  .doc(uid)
                  .set(userInfo);
                if (that.state.physio) {
                  this.setState({physio: false});
                  that.props.navigation.navigate('Patients', {
                    config: config,
                    user: userInfo,
                  });
                } else {
                  that.props.navigation.navigate('Playlist', {
                    name: name,
                    item: userInfo,
                    config: config,
                  });
                }
              })
              .catch(function (error) {
                // console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          }
        });
    } else {
      await db
        .collection('users')
        .doc(firebaseUser.uid)
        .get()
        .then((data) => {
          let user = data.data();
          if (user.physio) {
            that.props.navigation.navigate('Patients', {config: config, user});
          } else {
            that.props.navigation.navigate('Playlist', {
              name: user.name,
              item: user,
              config: config,
            });
          }
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
  };

  onSignIn = async (googleUser) => {
    // console.log('onSignIn GETTING CALLED');
    this.isLoggedIn(this.googleSignInCheck, 1, {googleUser: googleUser});
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].uid === googleUser.user.id) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Button
          color="#3D9DF2"
          title="Get All Appointments"
          onPress={() => getAppointment()}
        />
        <Button
          color="#3D9DF2"
          title="Get All Appointments 1"
          onPress={this.handleLogin}
        />
        <Button
          color="#3D9DF2"
          title="Get All Appointments 2"
          onPress={this.handleLogin}
        />
        <Button
          color="#3D9DF2"
          title="Get All Appointments 3"
          onPress={this.handleLogin}
        />
      </View>
    );
  }
}

APIHandler.navigationOptions = ({navigation}) => {
  return {
    title: null,
    headerShown: false,
  };
};
