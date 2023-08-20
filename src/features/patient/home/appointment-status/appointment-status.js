import React, {useEffect, useState, useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getAppointment} from '../../../../services/firebase';
import {Text, HStack, Box} from 'native-base';
import {SaveAppointment} from '../../../../components/save-appointment';
import moment from 'moment';

export const AppointmentStatus = ({user}) => {
  const [state, setState] = useState({
    isLoadingAppointment: false,
    appointmentDetails: null,
    isAppointmentSaved: false,
  });
  const {appointmentDetails, isLoadingAppointment} = state;
  const email = user?.email;
  const uid = user?.uid;

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
        <Text fontSize="sm" p="2">
          Checking for appointment...
        </Text>
      );
    }

    if (appointmentDetails?.occurrenceDate) {
      return (
        <HStack mb="2">
          <MaterialIcons name="calendar-month" size={40} color={'#2eaeec'} />
          <Box justifyContent="center" ml="2" mr="2">
            <Text fontSize="sm">Next appointment at:</Text>
            <Text bold color="#3629C5" fontSize="sm">
              {moment(appointmentDetails?.occurrenceDate).format('lll')}
            </Text>
          </Box>
          <SaveAppointment appointmentDetails={appointmentDetails} />
        </HStack>
      );
    } else {
      return (
        <Text fontSize="sm">You don't have any appointment at the moment</Text>
      );
    }
  };

  return appointmentStatus();
};
