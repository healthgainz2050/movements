import React from 'react';
import {ListItem, Left, Right, Button} from '@native-base';
import {updatePlaylistId} from './actions';
import {Text} from 'react-native';

export const renderRow = (item, context, navigation) => {
  const patient = context.selectedPatient;
  const isAssigned = patient.playlistId === item.id;
  return (
    <ListItem
      noIndent
      onPress={() => {
        navigation.navigate('PlayListDetail', {
          playlist: item,
        });
      }}>
      <Left>
        <Text>{item.playlistName}</Text>
      </Left>
      <Right style={{flex: 1}}>
        <Button
          onPress={() =>
            updatePlaylistId(patient.patientEmail, item.id, context)
          }
          disabled={!!isAssigned}
          transparent>
          <Text style={{color: isAssigned ? 'grey' : '#3D9DF2'}}>
            {isAssigned ? 'Assigned' : 'Assign'}
          </Text>
        </Button>
      </Right>
    </ListItem>
  );
};
