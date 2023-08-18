import React, {useContext} from 'react';
import {
  Container,
  Text,
  Stack,
  FormControl,
  TextArea,
  Box,
  ScrollView,
} from 'native-base';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {
  PostFormData,
  byPropKey,
} from '../../../../components/HOC/add-patient-form';
import {ModalHeader} from '../../../../components/modal-header';
import Toast from 'react-native-toast-message';
import {NBInput} from '../../../../components/nb-input';
import {NBButton} from '../../../../components/nb-button';
import {useRoute} from '@react-navigation/native';
import {isValidForm} from '../../../../utils';

function AddExerciseForm(props) {
  const route = useRoute();

  const validationFields = {
    name: '',
    sets: '',
    reps: '',
    hold: '',
  };
  const {name, sets, reps, hold} = props.item;
  const isValid = isValidForm({...validationFields, name, sets, reps, hold});
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
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
                onChangeText={text =>
                  props.handleChange(byPropKey('name', text))
                }
              />
            </Stack>
            <Stack>
              <NBInput
                placeholder="Sets"
                onChangeText={text =>
                  props.handleChange(byPropKey('sets', text))
                }
              />
            </Stack>
            <Stack>
              <NBInput
                placeholder="Reps"
                onChangeText={text =>
                  props.handleChange(byPropKey('reps', text))
                }
              />
            </Stack>
            <Stack>
              <NBInput
                placeholder="Hold"
                onChangeText={text =>
                  props.handleChange(byPropKey('hold', text))
                }
              />
            </Stack>
            <FormControl mb="2">
              <Stack>
                <NBInput
                  placeholder="Video URL"
                  onChangeText={text =>
                    props.handleChange(byPropKey('video_url', text))
                  }
                  mb="0"
                />
              </Stack>
              <FormControl.HelperText>
                Enter a video url or leave blank to upload video later
              </FormControl.HelperText>
            </FormControl>

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
              disabled={!isValid}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const AddExercise = PostFormData('exercises')(AddExerciseForm);
