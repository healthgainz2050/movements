import React, {useContext, useEffect} from 'react';
import {Container, Text, Stack, FormControl, TextArea, Box} from 'native-base';
import {
  PostFormData,
  byPropKey,
} from '../../../../components/HOC/add-patient-form';
import {ModalHeader} from '../../../../components/modal-header';
import GlobalContext from '../../../../services/context/globalContext';
import Toast from 'react-native-toast-message';
import {NBInput} from '../../../../components/nb-input';
import {NBButton} from '../../../../components/nb-button';
import {useNavigation, useRoute} from '@react-navigation/native';

function AddExerciseForm(props) {
  const context = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();

  // useEffect(() => {
  //   const {selectedPatient} = context;
  //   // props.handleChange(byPropKey('patientEmail', selectedPatient.patientEmail));
  //   // props.handleChange(byPropKey('viewed', 0));
  //   // props.handleChange(byPropKey('viewComplete', 0));
  // }, []);

  return (
    <Container
      maxWidth="100%"
      m="10"
      justifyContent="center"
      alignItems="center">
      <ModalHeader title="Add Exercise" parent={props} rightText="Cancel" />
      <FormControl>
        <Box itemDivider width={'100%'} bg="#44CF38" mb="5">
          <Text bold p="2">
            Exercise Details
          </Text>
        </Box>
        <Stack>
          <NBInput
            placeholder="Exercise Name"
            onChangeText={text => props.handleChange(byPropKey('name', text))}
          />
        </Stack>
        <Stack>
          <NBInput
            placeholder="Sets"
            onChangeText={text => props.handleChange(byPropKey('sets', text))}
          />
        </Stack>
        <Stack>
          <NBInput
            placeholder="Reps"
            onChangeText={text => props.handleChange(byPropKey('reps', text))}
          />
        </Stack>
        <Stack>
          <NBInput
            placeholder="Hold"
            onChangeText={text => props.handleChange(byPropKey('hold', text))}
          />
        </Stack>
        <Stack>
          <NBInput
            placeholder="Video URL"
            onChangeText={text =>
              props.handleChange(byPropKey('video_url', text))
            }
          />
        </Stack>
        <Box itemDivider width={'100%'} bg="#44CF38" mb="5">
          <Text bold p="2">
            Description
          </Text>
        </Box>
        <TextArea
          rowSpan={5}
          placeholder="Exercise description"
          onChangeText={text =>
            props.handleChange(byPropKey('description', text))
          }
        />
        <NBButton
          mt="5"
          label="Add Exercise"
          onPress={() => {
            if (!props?.item?.name) {
              Toast.show({
                type: 'error',
                text1: 'Exercise name is required',
                duration: 2000,
                autoHide: true,
              });
              return;
            }
            props.submitForm();
            route?.params?.fetchExercise();
          }}
        />
      </FormControl>

      <Toast position="bottom" bottomOffset={20} />
    </Container>
  );
}

export const AddExercise = PostFormData('exercises')(AddExerciseForm);
