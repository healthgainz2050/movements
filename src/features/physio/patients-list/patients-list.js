import React from 'react';
import SubscribeToCollection from '../../../components/HOC/list-of-users';
import {Container, Box, FlatList, HStack} from 'native-base';
import GlobalContext from '../../../services/context/globalContext';
import {
  fetchAllPatients,
  fetchAppUrls,
  getAllPlaylists,
} from '../../../services/firebase';
import {PatientItem} from './patient-item';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {NBButton} from '../../../components/nb-button';
import {CommonActions} from '@react-navigation/native';

class PatientListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
      isLoading: false,
    };
    this.fetchPatient = this.fetchPatient.bind(this);
    this.syncPatients = this.syncPatients.bind(this);
  }

  componentDidMount = async () => {
    const {user} = this.context;
    this.fetchPatient(user);

    this.props.navigation.dispatch(
      CommonActions.setParams({syncPatients: this.syncPatients}),
    );
  };

  syncPatients = () => {
    const {user} = this.context;
    this.fetchPatient(user);
  };
  fetchPatient = async user => {
    this.setState({isLoading: true});
    const patients = await fetchAllPatients(user.email);
    const playlists = await getAllPlaylists(user.email);
    const appUrls = await fetchAppUrls();
    this.context.updateState({patients, playlists, appUrls});
    this.setState({patientList: patients, isLoading: false, appUrls});
  };

  deletePatient = async item => {
    await firestore()
      .collection('patients')
      .where('patientEmail', '==', item.patientEmail)
      .get()
      .then(docs => {
        docs.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    await firestore()
      .collection('exercises')
      .where('patientEmail', '==', item.patientEmail)
      .get()
      .then(docs => {
        docs.forEach(function (doc) {
          doc.ref.delete();
        });
      });
    this.syncPatients();
  };

  addAppointmentToDatabase = appointment => {
    // Add a new document in collection "cities"
    firestore()
      .collection('appointments')
      .add(appointment)
      .then(function (res) {
        console.log('appointment successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  render() {
    const {patientList, isLoading} = this.state;
    return (
      <Container maxWidth="100%" alignItems="center">
        <Box mt="5" maxWidth="80%">
          <HStack alignItems="center" justifyContent="center">
            <NBButton
              onPress={() => {
                this.props.navigation.navigate('AddPatient', {
                  syncPatients: this.syncPatients,
                });
              }}
              label="Add Profile"
              ml="5"
              mr="5"
            />
            {/* <NBButton
              onPress={() => {
                this.props.navigation.navigate('SetupPaymentScreen', {
                  syncPatients: this.syncPatients,
                });
              }}
              ml="5"
              mr="5"
              label="Add Payments"
            /> */}
          </HStack>

          {isLoading && (
            <ActivityIndicator
              size="large"
              style={{marginTop: '50%'}}
              color="#3862CF"
            />
          )}
        </Box>
        <FlatList
          width="100%"
          m="5"
          data={patientList}
          keyExtractor={(item, index) => {
            return item.a;
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onLongPress={() => {
                this.context.updateState({selectedPatient: item});
                this.props.navigation.navigate('Exercises', {
                  name: item?.name,
                  item,
                });
              }}>
              <PatientItem
                item={item}
                navigation={this.props.navigation}
                deletePatient={this.deletePatient}
                addAppointmentToDatabase={this.addAppointmentToDatabase}
                syncPatients={this.syncPatients}
              />
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}

// need to add user ID here.
const PhysioHome = SubscribeToCollection('patients')(PatientListView);

PatientListView.contextType = GlobalContext;

export {PhysioHome};
