import React from 'react';
import {Container, Stack, FormControl, Box} from 'native-base';
import {
  PostFormData,
  byPropKey,
} from '../../../../components/HOC/add-patient-form';
import {lowerCase} from '../../../../utils';
import {ModalHeader} from '../../../../components/modal-header';
import {NBInput} from '../../../../components/nb-input';
import {NBButton} from '../../../../components/nb-button';
import {useRoute} from '@react-navigation/native';

const AddPatientForm = props => {
  const route = useRoute();
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
        <Stack>
          <NBInput
            placeholder="Email Address"
            onChangeText={text =>
              props.handleChange(byPropKey('patientEmail', lowerCase(text)))
            }
          />
        </Stack>
        <Stack>
          <NBInput
            placeholder="Phone"
            onChangeText={number =>
              props.handleChange(byPropKey('Phone', number))
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
        />
      </Box>

      {/* <Button full style={{marginHorizontal: 15, backgroundColor: '#007aff'}}>
          <Text style={{fontWeight: 'bold'}}></Text>
        </Button> */}
    </Container>
  );
};

export const AddPatient = PostFormData('patients')(AddPatientForm);
