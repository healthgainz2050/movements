import React, {useContext} from 'react';
import {Button, Text, Flex, Pressable} from 'native-base';
import {assignPlaylistToPatient} from '../../../../../services/firebase';
import GlobalContext from '../../../../../services/context/globalContext';
import {useNavigation} from '@react-navigation/native';

export const PlaylistRow = ({item}) => {
  const context = useContext(GlobalContext);
  const patient = context.selectedPatient;
  const isAssigned = patient.playlistId === item.id;
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
    <Pressable
      onPress={() => {
        navigation.navigate('PlayListDetail', {
          playlist: item,
        });
      }}>
      <Flex
        width="100%"
        p="2"
        direction="row"
        maxWidth="100%"
        bg="primary.100"
        justifyContent={'space-between'}
        alignItems="center"
        rounded="2">
        <Text width="70%">{item.playlistName}</Text>
        <Button
          size="sm"
          variant="link"
          onPress={() => updatePlaylistId(patient.patientEmail, item.id)}
          disabled={isAssigned}>
          <Text color={!isAssigned ? '#007aff' : '#808080'}>
            {isAssigned ? 'Assigned' : 'Assign'}
          </Text>
        </Button>
      </Flex>
    </Pressable>
  );
};
