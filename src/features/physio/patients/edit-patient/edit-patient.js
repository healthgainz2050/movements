import React, {useState} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {Container, Stack, FormControl, Box} from 'native-base';
import {ModalHeader} from '../../../../components/modal-header';
import {NBInput} from '../../../../components/nb-input';
import {NBButton} from '../../../../components/nb-button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {isValidForm} from '../../../../utils';

export const EditPatient = props => {
  const route = useRoute();
  const data = route?.params?.item;
  const navigation = useNavigation();

  const [state, setState] = useState({
    name: data.name,
    email: data.patientEmail,
    phone: data.Phone,
  });

  const submitForm = async () => {
    await firestore()
      .collection('patients')
      .where('patientEmail', '==', data.patientEmail)
      .get()
      .then(docs => {
        docs.forEach(function (doc) {
          doc.ref
            .update({
              name: state.name,
              patientEmail: state.email,
              phone: state.phone,
            })
            .then(res => {
              route?.params?.syncPatients();
              navigation.goBack();
            });
        });
      });
  };
  const isValid = isValidForm(state);
  return (
    <Container
      maxWidth="100%"
      m="10"
      justifyContent="center"
      alignItems="center">
      <ModalHeader title="Update Client" parent={props} rightText="Cancel" />
      <FormControl>
        <Stack>
          <NBInput
            value={state.name}
            placeholder="Name"
            onChangeText={text => setState({...state, name: text})}
          />
        </Stack>
        <Stack>
          <NBInput
            disabled
            isReadOnly
            value={state.email}
            placeholder="Email Address"
            onChangeText={text => setState({...state, email: text})}
            InputRightElement={
              <Box mr="5">
                <Icon
                  name="information-circle"
                  onPress={() =>
                    Alert.alert(
                      "Cannot update client's email, it is the basic identity of a client, please create a new client with other email",
                    )
                  }
                />
              </Box>
            }
          />
        </Stack>
        <Stack>
          <NBInput
            value={state.phone}
            placeholder="Phone"
            onChangeText={number => setState({...state, phone: number})}
          />
        </Stack>
      </FormControl>
      <Box mt="5">
        <NBButton
          disabled={!isValid}
          onPress={() => {
            submitForm();
          }}
          label="Update Client"
        />
      </Box>
    </Container>
  );
};
