import React, {useState, useEffect, useContext} from 'react';
import SubscribeToCollection from '../../HOC/List';
import {Content, List, ListItem, Container} from '@native-base';
import {Platform, Text, View} from 'react-native';
import Swipeout from 'rc-swipeout/lib';
import {auth} from '../../Controllers/Firebase';
import {HeaderBackButton} from 'react-navigation-stack';
import {TextButton} from '../../Components/TextButton';
import {loadString} from '../../utils/storage';
import GlobalContext from '../../context/globalContext';
import {AnimatedBounce} from '../../Components/AnimatedBounce';
import {HeaderTitle} from '../../Components/HeaderTitle';
import {fetchPatient, syncPatients, isSwipeout} from './actions';
import {Cone} from '../../Components/curve-shape';

const PatientListView = props => {
  const context = useContext(GlobalContext);
  const [state, setState] = useState({
    patientList: [],
    isLoading: false,
  });

  const {patientList} = state;
  const {user} = context;

  return (
    <Container>
      <Content style={{backgroundColor: 'white'}}>
        <List
          dataArray={patientList || []}
          keyExtractor={(item, index) => {
            return item.patientEmail;
          }}
          renderRow={(item, index) => {
            if (!item?.name) {
              return null;
            }
            return (
              <Swipeout
                style={{backgroundColor: '#fff'}}
                autoClose={true}
                right={isSwipeout(
                  {...item, index},
                  user,
                  setState,
                  state,
                  props.navigation,
                  context,
                )}>
                <ListItem
                  style={{justifyContent: 'space-between'}}
                  onPress={() => {
                    context.updateState({selectedPatient: item});
                    props.navigation.navigate('Exercises', {
                      name: item?.name,
                      item,
                    });
                  }}>
                  <Text>{item?.name}</Text>
                  {index === 0 ? <AnimatedBounce /> : null}
                </ListItem>
              </Swipeout>
            );
          }}
        />
      </Content>
    </Container>
  );
};

const Patients = SubscribeToCollection('patients')(PatientListView);

Patients.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'Patients'} />,
    headerLeft: () => (
      <HeaderBackButton
        onPress={async () => {
          const accessToken = await loadString('accessToken');
          await auth.signOut();
          navigation.navigate('Login');
        }}
        label={'Sign Out'}
        backTitleVisible={Platform.OS == 'ios' ? true : false}
      />
    ),
    headerRight: () => <Cone />,
    // headerRight: (
    //   <TextButton
    //     isAnimated
    //     onPress={() => {
    //       navigation.navigate('AddPatient', {
    //         syncPatients: navigation.getParam('syncPatients'),
    //       });
    //     }}
    //     title="Add Patient"
    //   />
    // ),
  };
};
export default Patients;
