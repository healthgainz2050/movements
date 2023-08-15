import React, {useContext, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

/**Auth Feature */
import {Login} from '../features/auth/login';
import {Splash} from '../features/auth/splash/splash';
import {ForgotPassword} from '../features/auth/forgot-password';
import {Signup} from '../features/auth/register';
import {SignOutButton} from '../components/sign-out-button';

/**Patient Feature */
import {Home} from '../features/patient/home';

/**Physio Feature */
import {PhysioHome} from '../features/physio';
import {AddPatient} from '../features/physio/patients/add-patient';
import {UsageAnalytics} from '../features/physio/patients/analysis';
import {EditPatient} from '../features/physio/patients/edit-patient';
// //list of exercises
import {AssignedPlaylist} from '../features/physio/playlists/assigned-playlist';
import {PlaylistList} from '../features/physio/playlists/playlist-list';
import {CreatePlaylist} from '../features/physio/playlists/create-playlist';
// //detail of exercise
// import ExerciseDetail from '../features/physio/exercises/exercise-detail';
// import AddExercise from '../features/physio/exercises/add-exercise';
// import AddVideo from '../features/physio/exercises/add-video';

/**Context */
import GlobalContext from '../services/context/globalContext';

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
          <>
            <Stack.Screen
              name="PhysioHome"
              component={PhysioHome}
              options={{
                headerTitle: 'Clients',
                headerLeft: () => <SignOutButton />,
              }}
            />
            <Stack.Screen
              name="AddPatient"
              component={AddPatient}
              options={{
                headerTitle: 'Add Client',
                headerShown: false,
                // headerLeft: () => <SignOutButton />,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="UsageAnalytics"
              component={UsageAnalytics}
              options={{
                headerTitle: 'App Usage',
                // headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditPatient"
              component={EditPatient}
              options={{
                headerTitle: 'Update Client',
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="AssignedPlaylist"
              component={AssignedPlaylist}
              options={{
                headerTitle: 'Active Playlist',
                // headerShown: false,
                // presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="PlaylistList"
              component={PlaylistList}
              options={{
                headerTitle: 'Playlists',
                // headerShown: false,
                // presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="CreatePlaylist"
              component={CreatePlaylist}
              options={{
                headerTitle: 'Create Playlist',
                // headerShown: false,
                // presentation: 'modal',
              }}
            />
            {/* <Stack.Screen
              name="AddExercise"
              component={AddExercise}
              options={{
                headerTitle: 'Add Exercise',
                // headerShown: false,
                // presentation: 'modal',
              }}
            /> */}
            {/* 
            <Stack.Screen
              name="ExerciseDetail"
              component={ExerciseDetail}
              options={{
                headerTitle: 'ExerciseDetail',
                headerShown: false,
                // presentation: 'modal',
              }}
            />{' '}
            <Stack.Screen
              name="AddExercise"
              component={AddExercise}
              options={{
                headerTitle: 'AddExercise',
                headerShown: false,
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="AddVideo"
              component={AddVideo}
              options={{
                headerTitle: 'AddVideo',
                headerShown: false,
                presentation: 'modal',
              }}
            /> */}
          </>
        ) : (
          <Stack.Screen
            name="ClientHome"
            component={Home}
            options={{
              headerTitle: user?.name || user?.displayName,
              headerLeft: () => <SignOutButton />,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
