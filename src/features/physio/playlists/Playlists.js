import React from 'react';
import {Platform} from 'react-native';
// import {Text, Button} from 'react-native';
import GlobalContext from '../../context/globalContext';
import {HeaderBackButton} from 'react-navigation-stack';
import {HeaderTitle} from '../../Components/HeaderTitle';
import {renderContent} from './render-content';
import {Cone} from '../../Components/curve-shape';

export const Playlists = ({navigation}) => {
  return (
    <GlobalContext.Consumer>
      {(context) => renderContent(context, navigation)}
    </GlobalContext.Consumer>
  );
};

Playlists.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'Playlists'} />,
    // headerRight: () => (
    //   <Button
    //     transparent
    //     title='Create Playlist'
    //     onPress={() => navigation.navigate('CreatePlaylists', {data: null})}>
    //     <Text style={{color: '#3D9DF2'}}>Create Playlist</Text>
    //   </Button>
    // ),
    headerRight: () => <Cone />,
    headerLeft: () => {
      return (
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          label={'Back'}
          backTitleVisible={Platform.OS == 'ios' ? true : false}
        />
      );
    },
  };
};
