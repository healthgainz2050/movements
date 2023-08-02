import React from 'react';
import {Container, Text, Content, List, Button} from '@native-base';
import {renderRow} from './render-row';

export const renderContent = (context, navigation) => {
  const {playlists} = context;
  return (
    <Container>
      <Content style={{backgroundColor: 'white'}}>
        {!playlists.length ? (
          <Text style={{margin: 20}}>Please Create a Playlist to assign</Text>
        ) : null}

        <List
          dataArray={playlists}
          renderRow={(item) => renderRow(item, context, navigation)}
        />
        <Button
          style={{borderRadius: 0, margin: 12, backgroundColor:'#007aff'}}
          onPress={() => navigation.navigate('CreatePlaylist', {data: null})}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: 'bold',
              flex: 1,
            }}>
            Create Playlist
          </Text>
        </Button>
      </Content>
    </Container>
  );
};
