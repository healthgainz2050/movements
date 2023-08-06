import React from 'react';
const utcDateToString = (momentInUTC) => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return s;
};
const nowUTC = moment.utc();
import {View, Alert, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {db} from '../../Controllers/Firebase';
import {getAllPlaylists} from '../../Services/playlist';
import {fetchAllPatients, fetchAppUrls} from '../../Services/patient';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {styles} from './styles';

export const syncPatients = (user, setState, state, context) => {
  fetchPatient(user, setState, state, context);
};

export const fetchPatient = async (user, setState, state, context) => {
  setState({...state, isLoading: true});
  const patients = await fetchAllPatients(user.email);
  const playlists = await getAllPlaylists(user.email);
  const appUrls = await fetchAppUrls();
  context.updateState({patients, playlists, appUrls});
  console.log('@@@ latest context', appUrls);
  setState({patientList: patients, isLoading: false, appUrls});
};

export const deletePatient = async (item, user, setState, state, context) => {
  await db
    .collection('patients')
    .where('patientEmail', '==', item.patientEmail)
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  await db
    .collection('exercises')
    .where('patientEmail', '==', item.patientEmail)
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        doc.ref.delete();
      });
    });
  syncPatients(user, setState, state, context);
};

export const addToCalendar = (item) => {
  const eventConfig = {
    title: 'Appointment',
    startDate: utcDateToString(nowUTC),
    endDate: utcDateToString(moment.utc(nowUTC).add(5, 'hours')),
    notes: 'Please be there on time',
  };

  AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then(async (eventInfo) => {
      if (eventInfo.action === 'SAVED') {
        const eventInfoX = await RNCalendarEvents.findEventById(
          eventInfo?.calendarItemIdentifier,
        );
        const appointment = {
          patientEmail: item?.patientEmail,
          physioEmail: item?.physioEmail,
          appointment: eventInfoX,
        };
        addAppointmentToDatabase(appointment);
      }
    })
    .catch((error) => {
      console.warn(error);
    });
};

export const addAppointmentToDatabase = (appointment) => {
  db.collection('appointments')
    .add(appointment)
    .then(function (res) {})
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const isSwipeout = (
  item,
  user,
  setState,
  state,
  navigation,
  context,
) => {
  return [
    {
      text: (
        <View style={styles.pdf}>
          <MaterialIcons name={'picture-as-pdf'} size={25} color={'black'} />
          <Text style={{color: 'black'}}>PDF</Text>
        </View>
      ),
      onPress: () => {
        navigation.navigate('Analysis', {
          item: item,
        });
        context.updateState({activePatient: item});
      },
    },
    {
      text: (
        <View style={styles.analysis}>
          <MaterialIcons name={'equalizer'} size={25} color={'green'} />
          <Text style={{color: 'green'}}>Analysis</Text>
        </View>
      ),
      onPress: () => {
        navigation.navigate('Analysis', {
          item: item,
        });
        context.updateState({activePatient: item});
      },
    },
    {
      text: (
        <View style={styles.diary}>
          <MaterialIcons name={'event'} size={25} color={'deepskyblue'} />
          <Text style={{color: 'deepskyblue'}}>Diary</Text>
        </View>
      ),
      onPress: () => {
        addToCalendar(item);
        context.updateState({activePatient: item});
      },
    },
    {
      text: (
        <View style={styles.edit}>
          <MaterialIcons name={'edit'} size={25} color={'white'} />
          <Text style={{color: 'white'}}>Edit</Text>
        </View>
      ),
      onPress: () => {
        navigation.navigate('EditPatient', {
          item: item,
          syncPatients: syncPatients,
        });
        context.updateState({activePatient: item});
      },
    },
    {
      text: (
        <View style={styles.delete}>
          <MaterialIcons name={'delete'} size={25} color={'white'} />
          <Text style={{color: 'white'}}>Delete</Text>
        </View>
      ),
      onPress: () => {
        Alert.alert('Delete', `Are you sure to delete client profile ${item?.name}`, [
          {
            text: 'Yes',
            onPress: () => {
              deletePatient(item, user, setState, state, context);
            },
          },
          {
            text: 'No',
            style: 'cancel',
          },
        ]);
        context.updateState({activePatient: null});
      },
    },
  ];
};
