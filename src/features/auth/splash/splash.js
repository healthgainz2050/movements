import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ActivityIndicator,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {images} from '../../../assets';
import GlobalContext from '../../../services/context/globalContext';
// import {isLoggedIn, changeScreen} from './actions';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../login';
import {ForgotPassword} from '../forgot-password';
import {Signup} from '../register';
import {NativeBaseProvider, Box} from 'native-base';

const Stack = createNativeStackNavigator();
function HomeScreen() {
  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" />
    </View>
  );
}

function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" />
    </View>
  );
}

export const Splash = ({navigation}) => {
  const context = useContext(GlobalContext);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setTimeout(() => setInitializing(false), 1500);
    }
  };

  useEffect(() => {
    // isLoggedIn(() => changeScreen(navigation, context), 2);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={images.app_logo} />
        <ActivityIndicator size="small" />
      </View>
    );
  }

  // if (!user) {
  //   return (
  //     <View>
  //       <Text>Login</Text>
  //     </View>
  //   );
  // }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!user ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="SignIn"
                component={Login}
                options={{
                  title: 'Sign in',
                }}
                // initialParams={{setUserToken}}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  title: 'Forgot Password',
                }}
                // initialParams={{setUserToken}}
              />
              <Stack.Screen
                name="SignUp"
                component={Signup}
                options={{
                  title: 'Sign up',
                }}
                // initialParams={{setUserToken}}
              />
            </>
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

Splash.navigationOptions = () => {
  return {
    title: null,
    headerShown: false,
  };
};
