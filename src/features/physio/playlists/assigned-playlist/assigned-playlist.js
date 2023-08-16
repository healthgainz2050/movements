import React, {useEffect, useContext, useState} from 'react';
import {Box, FlatList, Container, Text} from 'native-base';
import {sendEmail} from '../../../../utils';
import GlobalContext from '../../../../services/context/globalContext';
import {styles} from './styles';
import {ExerciseRow} from './exercise-row';
import {getPatientUser} from '../../../../services/firebase';
import {lowerCase} from '../../../../utils';
import {NBButton} from '../../../../components/nb-button';

export const AssignedPlaylist = ({route, navigation}) => {
  const context = useContext(GlobalContext);
  const [state, setState] = useState({data: [], id: null});
  let data = route.params;

  useEffect(() => {
    fetchPatientUser(context, state, setState);
  }, []);

  const fetchPatientUser = async () => {
    const {selectedPatient} = context;
    const patientUser = await getPatientUser(
      lowerCase(selectedPatient.patientEmail),
    );
    setState({...state, patientUser});
  };

  const {patientUser} = state;
  const {playlists, selectedPatient, appUrls, user} = context;
  let playlist = playlists?.filter(
    playlist => playlist.id === selectedPatient.playlistId,
  )[0];
  return (
    <Container
      maxWidth={'100%'}
      height={'100%'}
      alignItems={'center'}
      bg="#fffff">
      {playlist && (
        <NBButton
          label="Change Playlist"
          onPress={() => navigation.navigate('PlaylistList', {data: data})}
          mt={5}
        />
      )}
      <Box alignItems="center" mb="3" mt="3">
        <Text style={styles.playlistName}> {playlist?.playlistName}</Text>
        <Text note numberOfLines={1}>
          {playlist ? 'is the playlist ' : 'There is no playlist '}
          assigned to the{' '}
          <Text style={styles.name}>{selectedPatient.name}</Text>
        </Text>
      </Box>
      {!playlist ? (
        <NBButton
          label="Assign a Playlist"
          onPress={() => navigation.navigate('PlaylistList', {data: null})}
          mt={10}
        />
      ) : null}
      <FlatList
        data={playlist?.exercises}
        renderItem={({item}) => <ExerciseRow item={item} />}
      />
      {!patientUser?.length ? (
        <NBButton
          label="Invite Client"
          onPress={() => sendEmail(selectedPatient, user, appUrls)}
          mb={5}
        />
      ) : null}
    </Container>
  );
};
