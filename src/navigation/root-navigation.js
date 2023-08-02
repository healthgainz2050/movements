import React, {useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import GlobalContext from '../services/context/globalContext';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../features/auth/login';
import {Splash} from '../features/auth/splash/splash';
import {ForgotPassword} from '../features/auth/forgot-password';
import {Signup} from '../features/auth/register';
import firestore from '@react-native-firebase/firestore';
import {Home} from '../features/patient/home';

const Stack = createNativeStackNavigator();

function HomeScreen({route, navigation}) {
  return (
    <View>
      <Text>Signed in!</Text>
      <Button
        title="Sign out"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
      <Button title="update profile" onPress={() => {}} />
    </View>
  );
}

function HomeScreenPhysio({route, navigation}) {
  return (
    <View>
      <Text>Signed in Physio!</Text>
      <Button
        title="Sign out"
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
      <Button title="update profile" onPress={() => {}} />
    </View>
  );
}

export const RootNavigation = () => {
  const context = useContext(GlobalContext);
  const {user, authLoading} = context;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = userParam => {
    if (!userParam) {
      context.updateState({user: null, authLoading: false});
    } else {
      getUserInfo(userParam);
    }
  };

  const getUserInfo = async userParam => {
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(userParam.uid)
      .get();

    let userData = userParam;
    if (documentSnapshot.exists) {
      userData = {...documentSnapshot?.data()};
    }
    context.updateState({user: userData, authLoading: false});
  };

  if (authLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : user?.physio ? (
          <Stack.Screen name="HomePhysio" component={Home} />
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
