import React, {useContext, useEffect, useState, View} from 'react';
import {
  Container,
  Content,
  Input,
  Button,
  Text,
  Item,
  ListItem,
  List,
  Row,
} from '@native-base';
import {PostFormData, byPropKey} from '../../../HOC/Form';
import {Platform} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import GlobalContext from '../../../context/globalContext';
import {HeaderTitle} from '../../../Components/HeaderTitle';
import {onCreatePlaylist} from './actions';
import {exerciseListItem} from './exercise-list-item';
import {getAllExercises} from '../../../Services/playlist';
import {Cone} from '../../../Components/curve-shape';
import Toast from 'react-native-toast-message';
export const CreatePlaylist = (props) => {
  const [state, setState] = useState({
    allExercises: [],
    selectedExercises: [],
    playlistName: '',
    error: null,
  });
  const context = useContext(GlobalContext);
  useEffect(() => {
    let data = {
      patientEmail: 'test email',
      viewed: 0,
      viewComplete: 0,
    };
    // props.handleChange(byPropKey('patientEmail', data.patientEmail));
    // props.handleChange(byPropKey('viewed', 0));
    // props.handleChange(byPropKey('viewComplete', 0));
    if (!context.allExercises || !context?.allExercises?.length == 0) {
      fetchExercise();
    }
  }, []);

  const fetchExercise = async () => {
    try {
      const createdBy = context?.user?.email;
      const allExercises = await getAllExercises(createdBy);

      setState({...state, allExercises});
      context.updateState({allExercises});
    } catch (error) {
      console.log('@@@ fetchExercise error', error);
    }
  };

  const {selectedExercises} = state;
  const {allExercises} = context;
  if (allExercises) {
    return (
      <Container>
        <Item>
          <Input
            placeholder="Enter Playlist Name"
            onChangeText={(text) => setState({...state, playlistName: text})}
          />
        </Item>
        <ListItem itemDivider>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Select Exercises ({selectedExercises?.length})
          </Text>
        </ListItem>
        <Content style={{height: '80%'}}>
          <List
            dataArray={allExercises}
            renderRow={(item, index) =>
              exerciseListItem(state, props.navigation, setState, item)
            }
          />
        </Content>
        <Row
          style={{
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            height: '10%',
            marginTop: 10,
          }}>
          <Button
            half
            style={{backgroundColor:'#007aff'}}
            onPress={() =>
              props.navigation.navigate('AddExercise', {
                fetchExercise: fetchExercise,
              })
            }>
            {
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                {allExercises.length
                  ? 'Add Another Exercise'
                  : 'Create Exercise'}
              </Text>
            }
          </Button>
          <Button
            half
            style={{
              backgroundColor:'#007aff'
            }}
            onPress={() =>
              onCreatePlaylist(allExercises, state, context, props.navigation)
            }>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Create Playlist
            </Text>
          </Button>
        </Row>
        <Toast position={Platform.OS === 'android'? "top" : "bottom"} bottomOffset={20} />
      </Container>
    );
  }
  return null;
};

const CreatePlaylistView = PostFormData('exercises')(CreatePlaylist);

CreatePlaylist.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'Create Playlist'} />,
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
