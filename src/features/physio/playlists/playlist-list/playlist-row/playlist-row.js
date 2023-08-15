import React, {useContext} from 'react';
import {Box, Button} from 'native-base';
import {Text} from 'react-native';
import {assignPlaylistToPatient} from '../../../../../services/firebase';
import GlobalContext from '../../../../../services/context/globalContext';
import {useNavigation} from '@react-navigation/native';

export const PlaylistRow = ({item}) => {
  const patient = context.selectedPatient;
  const isAssigned = patient.playlistId === item.id;
  const context = useContext(GlobalContext);
  const navigation = useNavigation();

  const updatePlaylistId = async (patientEmail, playlistId) => {
    await assignPlaylistToPatient(patientEmail, playlistId);
    let selectedPatient = {};
    const updatedPatients = context.patients.map(patient => {
      if (patient.patientEmail === patientEmail) {
        patient.playlistId = playlistId;
        selectedPatient = patient;
      }
      return patient;
    });
    context.updateState({
      patients: updatedPatients,
      selectedPatient,
    });
  };
  return (
    <Box
      noIndent
      onPress={() => {
        navigation.navigate('PlayListDetail', {
          playlist: item,
        });
      }}>
      <Text>{item.playlistName}</Text>

      <Button
        onPress={() => updatePlaylistId(patient.patientEmail, item.id)}
        disabled={!!isAssigned}
        transparent>
        <Text style={{color: isAssigned ? 'grey' : '#3D9DF2'}}>
          {isAssigned ? 'Assigned' : 'Assign'}
        </Text>
      </Button>
    </Box>
  );
};
