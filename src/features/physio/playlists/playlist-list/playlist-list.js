import React, {useContext} from 'react';
import {Container, FlatList, Text, Box} from 'native-base';
import GlobalContext from '../../../../services/context/globalContext';
import {PlaylistRow} from './playlist-row';
import {NBButton} from '../../../../components/nb-button';

export const PlaylistList = ({navigation}) => {
  const context = useContext(GlobalContext);
  const {playlists} = context;
  return (
    <Container maxWidth="100%" height="100%" alignItems="center" bg="#fff">
      <Box alignItems="center" mt="10">
        {!playlists.length ? (
          <Text>Please Create a Playlist to assign</Text>
        ) : null}
        <NBButton
          mb="5"
          mt="5"
          label={'Create Playlist'}
          onPress={() => navigation.navigate('CreatePlaylist', {data: null})}
        />
      </Box>

      {playlists && (
        <FlatList
          data={playlists}
          renderItem={({item}) => <PlaylistRow item={item} />}
        />
      )}
    </Container>
  );
};
