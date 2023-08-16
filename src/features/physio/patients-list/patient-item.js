import React, {useContext, useState} from 'react';
import {Text, Box, Heading} from 'native-base';
import {Alert, TouchableOpacity} from 'react-native';
import Swipeout from 'rc-swipeout';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import GlobalContext from '.../../../services/context/globalContext';
import {AnimatedBounce} from '../../../components/animated-bounce';

import {
  Edit,
  Delete,
  PDF,
  AnalysisItem,
  Diary,
  Close,
} from '../../../components/swipable-item';

import PDFModal from './pdf-modal';
// import { addLandMark, createPlaylist, AddExerciseToPlaylist } from '../../Services/testing';
const utcDateToString = momentInUTC => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};
const nowUTC = moment.utc();

export const PatientItem = ({
  item,
  navigation,
  deletePatient,
  addAppointmentToDatabase,
  syncPatients,
}) => {
  const context = useContext(GlobalContext);
  const {playlists, selectedPatient, appUrls, user} = context;
  const playlist = playlists?.filter(
    playlist => playlist.id === item?.playlistId,
  )[0];
  const [modalVisible, setModalVisible] = useState(false);

  const addToCalendar = async () => {
    const eventConfig = {
      title: 'Appointment',
      startDate: utcDateToString(nowUTC),
      endDate: utcDateToString(moment.utc(nowUTC).add(5, 'hours')),
      notes: 'Please be there on time',
    };

    try {
      const eventInfo = await AddCalendarEvent.presentEventCreatingDialog(
        eventConfig,
      );
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
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert('Alert', errorMessage);
    }
  };

  const onSwipeout = () => {
    const onPressPDF = () => {
      setModalVisible(!modalVisible);
    };

    const close = Close({onPress: () => {}});
    const pdf = PDF({onPress: onPressPDF});

    const onPressAnalysis = () => {
      navigation.navigate('UsageAnalytics', {
        item: item,
      });
      context.updateState({activePatient: item});
    };
    const usage = AnalysisItem({onPress: onPressAnalysis});

    const onPressDiary = () => {
      addToCalendar();
      context.updateState({activePatient: item});
    };

    const diary = Diary({onPress: onPressDiary});

    const onEditPress = () => {
      navigation.navigate('EditPatient', {
        item: item,
        syncPatients: syncPatients,
      });
      context.updateState({activePatient: item});
    };

    const edit = Edit({onPress: onEditPress});

    const onDeletePress = () => {
      Alert.alert(
        'Delete',
        `Are you sure to delete client profile ${item?.name}`,
        [
          {
            text: 'Yes',
            onPress: () => {
              deletePatient(item);
            },
          },
          {
            text: 'No',
            style: 'cancel',
          },
        ],
      );
      context.updateState({activePatient: null});
    };

    const del = Delete({onPress: onDeletePress});

    const swipableArray = [close, del, edit, usage, diary];

    if (playlist) {
      swipableArray.push(pdf);
    }

    return swipableArray;
  };

  return (
    <Swipeout style={styles.swipeOutContainer} autoClose right={onSwipeout()}>
      {modalVisible ? (
        <PDFModal
          isVisible={modalVisible}
          closeModal={setModalVisible}
          item={item}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          context.updateState({selectedPatient: item});
          navigation.navigate('AssignedPlaylist', {
            name: item?.name,
            item,
          });
        }}>
        <Box>
          <Heading color="#fff" size="sm" p="5">
            {item?.name}
          </Heading>
          <AnimatedBounce />
        </Box>
      </TouchableOpacity>
    </Swipeout>
  );
};

const styles = {
  swipeOutContainer: {
    backgroundColor: '#44CF38',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
};
