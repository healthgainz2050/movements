import React, {useEffect, useContext, useState} from 'react';
import {Body, Content, List, Button, Container} from '@native-base';
import {Text, View, Platform} from 'react-native';
import {sendEmail} from '../../utils';
import {HeaderBackButton} from 'react-navigation-stack';
import GlobalContext from '../../context/globalContext';
import {HeaderTitle} from '../../Components/HeaderTitle';
import {styles} from './styles';
import {fetchPatientUser} from './actions';
import {renderRow} from './render-row';
import {Cone} from '../../Components/curve-shape';

export const Exercises = (props) => {
  const context = useContext(GlobalContext);
  // const navigation = useNavigation();
  const [state, setState] = useState({data: [], id: null});
  let data = props.navigation.getParam('item');
  Exercises.navigationOptions = ({navigation, screenProps}) => {
    const nameArr = navigation?.state?.params?.item?.name?.split(' ');

    let nameStr = '';
    nameArr?.forEach((str, index) => {
      if (index === nameArr.length - 1) {
        nameStr += str;
      } else {
        nameStr = nameStr + str[0] + '.';
      }
    });
    return {
      headerTitle: () => <HeaderTitle title={nameStr} />,
      headerLeft: () => {
        return (
          <HeaderBackButton
            onPress={() => navigation.goBack()}
            label={'Back'}
            backTitleVisible={Platform.OS == 'ios' ? true : false}
          />
        );
      },
      headerRight: () => <Cone />,
    };
  };

  useEffect(() => {
    fetchPatientUser(context, state, setState);
  }, []);

  const {patientUser} = state;
  return (
    <GlobalContext.Consumer>
      {(context) => {
        const {playlists, selectedPatient, appUrls, user} = context;
        const playlist = playlists?.filter(
          (playlist) => playlist.id === selectedPatient.playlistId,
        )[0];
        return (
          <Container>
            <Content style={{backgroundColor: 'white'}}>
              <Button
                // transparent
                style={{
                  marginLeft: 20,
                  marginRight: 60,
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor:'#007aff',
                  // alignItems: 'flex-start'
                }}
                onPress={() =>
                  props.navigation.navigate('Playlists', {data: data})
                }>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Change Playlist
                </Text>
              </Button>
              <Body>
                <Text style={styles.playlistName}>
                  {' '}
                  {playlist?.playlistName}
                </Text>
                <Text note numberOfLines={1}>
                  {playlist ? 'A playlist ' : 'There is no playlist '}
                  assigned to the{' '}
                  <Text style={styles.name}>{selectedPatient.name}</Text>
                </Text>
              </Body>
              {!playlist ? (
                <Button
                  style={styles.btn}
                  bordered
                  onPress={() =>
                    props.navigation.navigate('Playlists', {data: null})
                  }>
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: 'bold',
                      // flex: 1,
                      paddingHorizontal: 10,
                      textAlign: 'center',
                      backgroundColor:'#007aff'
                    }}>
                    Assign a Playlist
                  </Text>
                </Button>
              ) : null}
              <List
                dataArray={playlist?.exercises}
                renderRow={(item) => renderRow(item, props.navigation)}
              />
              {!patientUser?.length ? (
                <Button
                  style={styles.btn}
                  // bordered
                  half
                  onPress={() => sendEmail(selectedPatient, user, appUrls)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      // flex: 1,
                      paddingHorizontal: 10,
                      textAlign: 'center',
                    }}>
                    Invite Client
                  </Text>
                </Button>
              ) : null}
            </Content>
          </Container>
        );
      }}
    </GlobalContext.Consumer>
  );
};
