import React, {useEffect, useState, useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAppointment} from '../../../../services/firebase';
import {Heading, Center, Text} from 'native-base';
// import SaveAppointment from '../../../../test';
import moment from 'moment';
import {styles} from './styles';

export const AppointmentStatus = ({user}) => {
  const [state, setState] = useState({
    isLoadingAppointment: false,
    appointmentDetails: null,
    isAppointmentSaved: false,
  });
  const {appointmentDetails, isLoadingAppointment} = state;
  const {email, uid} = user;

  const fetchAppointments = useCallback(async () => {
    setState({...state, isLoadingAppointment: true});
    const appointments = await getAppointment(email);
    setState({
      ...state,
      appointmentDetails: appointments?.appointment,
      isLoadingAppointment: false,
    });
  }, [email, uid, state]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointmentStatus = () => {
    if (isLoadingAppointment) {
      return (
        <View style={styles.row}>
          <Heading size="l" mh="10">
            Checking for appointment...
          </Heading>
        </View>
      );
    }

    if (appointmentDetails?.occurrenceDate) {
      return (
        <TouchableOpacity
          style={[
            styles.row,
            {alignItems: 'center', justifyContent: 'flex-start'},
          ]}>
          <Ionicons name="md-calendar" size={40} color={'#2eaeec'} />
          <View style={{justifyContent: 'center'}}>
            <Heading size="l" mh="10">
              Next appointment at:
            </Heading>
            <Center>
              <Text bold mh="10" color="#3629C5" fontSize="xl">
                Bold
                {moment(appointmentDetails?.occurrenceDate).format('lll')}
              </Text>
            </Center>

            {/* <SaveAppointment appointmentDetails={appointmentDetails} /> */}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.row}>
          <Heading size="l" mh="10">
            You don't have any appointment at the moment
          </Heading>
        </View>
      );
    }
  };

  return appointmentStatus();
};
