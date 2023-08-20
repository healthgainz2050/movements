import React from 'react';
import {Container, Stack, FormControl, Box} from 'native-base';
import {
  PostFormData,
  byPropKey,
} from '../../../../components/HOC/add-patient-form';
import {lowerCase, isValidForm, isValidEmail} from '../../../../utils';
import {ModalHeader} from '../../../../components/modal-header';
import {NBInput} from '../../../../components/nb-input';
import {NBButton} from '../../../../components/nb-button';
import {useRoute} from '@react-navigation/native';

const AddPatientForm = props => {
  const route = useRoute();

  const initialState = {
    name: '',
    phone: '',
    patientEmail: '',
    ...props?.item,
  };

  const isEmailValid = isValidEmail(initialState.patientEmail);
  const isValid = isValidForm(initialState) && isEmailValid;

  return (
    <Container
      maxWidth="100%"
      m="10"
      justifyContent="center"
      alignItems="center">
      <ModalHeader title="Add Client" parent={props} rightText="Cancel" />
      <FormControl>
        <Stack>
          <NBInput
            placeholder="Name"
            onChangeText={text => props.handleChange(byPropKey('name', text))}
          />
        </Stack>
      </FormControl>
      <FormControl
        isInvalid={initialState.patientEmail && !isEmailValid}
        mb="5">
        <Stack>
          <NBInput
            placeholder="Email Address"
            onChangeText={text =>
              props.handleChange(byPropKey('patientEmail', lowerCase(text)))
            }
            mb="0"
          />
          <FormControl.ErrorMessage>
            Enter a valid email address
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl>
        <Stack>
          <NBInput
            placeholder="Phone"
            onChangeText={number =>
              props.handleChange(byPropKey('phone', number))
            }
          />
        </Stack>
      </FormControl>

      <Box mt="5">
        <NBButton
          onPress={() => {
            props.submitForm();
            // const syncPatients = props.navigation.getParam('syncPatients');
            route?.params?.syncPatients();
          }}
          label="Add Patient"
          disabled={!isValid}
        />
      </Box>
    </Container>
  );
};

export const AddPatient = PostFormData('patients')(AddPatientForm);
