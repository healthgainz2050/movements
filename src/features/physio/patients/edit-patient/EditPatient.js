import React, {useState} from 'react';
import {Content, Input, Form, Item, Button, Container} from '@native-base';
import {Alert, Text, View} from 'react-native';
import {ModalHeader} from '../../../Components/ModalHeader';
import {submitForm} from './actions';
import Icon from 'react-native-vector-icons/Ionicons';

export const EditPatient = (props) => {
  const data = props.navigation.getParam('item');
  const [state, setState] = useState({
    name: data.name,
    email: data.patientEmail,
    phone: data.Phone,
  });

  return (
    <Container>
      <ModalHeader title="Update" parent={props} rightText="Cancel" />
      <Content>
        <Form>
          <Item>
            <Input
              value={state.name}
              placeholder="Name"
              onChangeText={(text) => setState({...state, name: text})}
            />
          </Item>
          <Item disabled>
            <Input
              disabled
              value={state.email}
              placeholder="Email Address"
              onChangeText={(text) => setState({...state, email: text})}
            />
            <Icon
              name="information-circle"
              onPress={() =>
                Alert.alert(
                  "Cannot update client's email, it is the basic identity of a client, please create a new client with other email",
                )
              }
            />
          </Item>
          <Item>
            <Input
              value={state.phone}
              placeholder="Phone"
              onChangeText={(number) => setState({...state, phone: number})}
            />
          </Item>
        </Form>
        <Button
          full
          onPress={() => submitForm(data, state, props.navigation)}
          style={{marginHorizontal: 15, backgroundColor:'#007aff'}}>
          <Text style={{fontWeight: 'bold'}}>Update Client</Text>
        </Button>
      </Content>
    </Container>
  );
};
