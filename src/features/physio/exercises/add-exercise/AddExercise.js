import React, {useContext, useEffect} from 'react';
import {
  Content,
  Input,
  Form,
  Item,
  ListItem,
  Textarea,
  Button,
  Container
} from '@native-base';
import {Text, View} from 'react-native';
import {PostFormData, byPropKey} from '../../../HOC/Form';
import {ModalHeader} from '../../../Components/ModalHeader';
import GlobalContext from '../../../context/globalContext';
import Toast from 'react-native-toast-message';

function AddExerciseForm(props) {
  const context = useContext(GlobalContext);
  // useEffect(() => {
  //   const {selectedPatient} = context;
  //   // props.handleChange(byPropKey('patientEmail', selectedPatient.patientEmail));
  //   // props.handleChange(byPropKey('viewed', 0));
  //   // props.handleChange(byPropKey('viewComplete', 0));
  // }, []);

  return (
    <Container>
      <ModalHeader title="Add Exercise" parent={props} rightText="Cancel" />
      <Content>
        <Form>
          <ListItem
            itemDivider
            width={'80%'}
            style={{backgroundColor: '#44CF38', margin: 20}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Exercise Details
            </Text>
          </ListItem>
          <Item>
            <Input
              placeholder="Exercise Name"
              onChangeText={(text) =>
                props.handleChange(byPropKey('name', text))
              }
            />
          </Item>
          <Item>
            <Input
              placeholder="Sets"
              onChangeText={(text) =>
                props.handleChange(byPropKey('sets', text))
              }
            />
          </Item>
          <Item>
            <Input
              placeholder="Reps"
              onChangeText={(text) =>
                props.handleChange(byPropKey('reps', text))
              }
            />
          </Item>
          <Item>
            <Input
              placeholder="Hold"
              onChangeText={(text) =>
                props.handleChange(byPropKey('hold', text))
              }
            />
          </Item>
          <Item>
            <Input
              placeholder="Video URL"
              onChangeText={(text) =>
                props.handleChange(byPropKey('video_url', text))
              }
            />
          </Item>
          {/* <ListItem itemDivider>
            <Text>Description</Text>
          </ListItem> */}
          <ListItem
            itemDivider
            width={'80%'}
            style={{backgroundColor: '#44CF38', margin: 20}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Description
            </Text>
          </ListItem>
          <Textarea
            style={{margin: 5}}
            rowSpan={5}
            placeholder="Exercise description"
            onChangeText={(text) =>
              props.handleChange(byPropKey('description', text))
            }
          />
        </Form>
        <Button
          full
          style={{margin: 15, backgroundColor:'#007aff'}}
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
            props.navigation.state.params.fetchExercise();
          }}>
          <Text style={{fontWeight: 'bold', color:'#fff'}}>Add</Text>
        </Button>
        <Toast position="bottom" bottomOffset={20} />
      </Content>
    </Container>
  );
}

const AddExerciseFormView = PostFormData('exercises')(AddExerciseForm);

export default AddExerciseFormView;
