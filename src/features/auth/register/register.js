import React, {useContext, useState} from 'react';
import {Text, View, Switch} from 'react-native';
import {styles} from './styles';
import {images} from '../../../assets';
import {isValidEmail, isValidForm, lowerCase} from '../../../utils';
import {NBInput} from '../../../components/nb-input';
import {handleSignup, openUrl} from './actions';
import * as Animatable from 'react-native-animatable';
import {Heading} from 'native-base';
import {NBButton} from '../../../components/nb-button';
import Toast from 'react-native-toast-message';
import GlobalContext from '../../../services/context/globalContext';
import {Stack, FormControl} from 'native-base';
import {GoogleSignIn} from '../../../components/google-sign-in';

export const Signup = ({navigation}) => {
  const context = useContext(GlobalContext);

  const [form, setForm] = useState({
    displayName: '',
    password: '',
    name: '',
    physio: false,
  });
  var val = Math.floor(1000 + Math.random() * 9000);
  const [email, setEmail] = useState(null);

  const updateInputVal = (val, prop) => {
    const newValue = {
      [prop]: val,
    };

    setForm({...form, ...newValue});
  };

  const myForm = {
    ...form,
    email: lowerCase(email),
  };

  const isValid =
    isValidForm({
      displayName: form.displayName,
      password: form.password,
      email,
    }) && isValidEmail(email);

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="fadeInLeft"
        iterationCount={1}
        direction="alternate"
        source={images.app_logo}
        style={styles.image}
      />
      <Heading style={styles.signUpMessage}> Sign Up!</Heading>
      <NBInput
        mt="20px"
        placeholder="Name"
        value={form.displayName}
        onChangeText={val => updateInputVal(val, 'displayName')}
      />
      <FormControl mb="5" isInvalid={email && !isValidEmail(email)}>
        <Stack>
          <NBInput
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={val => setEmail(val)}
            mb="0"
          />
        </Stack>
        <FormControl.ErrorMessage>
          Enter a valid email address.
        </FormControl.ErrorMessage>
      </FormControl>
      <NBInput
        placeholder="Password"
        value={form.password}
        onChangeText={val => updateInputVal(val, 'password')}
        maxLength={15}
        secureTextEntry={true}
      />
      <View style={styles.row}>
        <Text style={styles.infoMsg}>Are you a Health Professional?</Text>
        <Switch
          trackColor={{false: '#767577', true: '#a1e8ff'}}
          thumbColor={form.physio ? '#48b4e0' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          value={form.physio}
          onValueChange={physio => setForm({...form, physio})}
        />
      </View>
      <View style={styles.mb20}>
        <Text style={styles.gdpr}>
          By using Movements application, you agree to
        </Text>
        <Text style={styles.gdpr}>
          {'our '}
          <Text style={styles.urlText} onPress={() => openUrl()}>
            Privacy Policy
          </Text>
          <Text> and </Text>
          <Text style={styles.urlText} onPress={() => openUrl()}>
            Terms of Service.{' '}
          </Text>
        </Text>
      </View>
      <NBButton
        label="Sign Up"
        onPress={() => handleSignup(myForm, context)}
        disabled={!isValid}
      />
      <GoogleSignIn />
      <Toast position="bottom" bottomOffset={20} />
      <Text
        style={styles.alreadyBtn}
        onPress={() => navigation.navigate('SignIn')}>
        Already Registered?{' '}
        <Text style={styles.tapText}>Tap here to Log In</Text>
      </Text>
    </View>
  );
};
