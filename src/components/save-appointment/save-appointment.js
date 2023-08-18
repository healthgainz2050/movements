/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import LocalCalendarModalComponent from './local-calendar-modal';
import {addCalendarEvent, listCalendars} from './local-calendar-service';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SaveAppointment = ({appointmentDetails}) => {
  const [isVisibleCalendars, setIsVisibleCalendars] = useState(false);
  const [event, setEvent] = useState(null);
  const [calendars, setCalendars] = useState([]);

  const [title, setTitle] = useState('New Appointment');
  const [startDateStr, setStartDateStr] = useState('2023-06-02');
  const [endDateStr, setEndDateStr] = useState('2023-06-02');
  const [appointmentSaved, setisAppointmentSaved] = useState(false);

  const openLocalCalendarModal = () => setIsVisibleCalendars(true);

  const closeLocalCalendarModal = () => setIsVisibleCalendars(false);

  const saveEvent = async calendar => {
    await addCalendarEvent(event, calendar);
    closeLocalCalendarModal();
    setisAppointmentSaved(true);
  };

  useEffect(() => {
    setTitle(appointmentDetails?.title);
    setStartDateStr(appointmentDetails?.occurrenceDate);
    setEndDateStr(appointmentDetails?.occurrenceDate);
  }, [appointmentDetails?.occurrenceDate]);

  useEffect(() => {
    const loadCalendars = async () => {
      const calendarsTmp = await listCalendars();
      setCalendars(calendarsTmp);
    };
    loadCalendars();
  }, []);

  const saveEventCalendar = async () => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const event = {
      title: title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      allDay: true,
    };

    setEvent(event);
    if (calendars.length > 1) {
      openLocalCalendarModal();
    } else {
      saveEvent(calendars[0]);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={saveEventCalendar}>
      <LocalCalendarModalComponent
        isVisible={isVisibleCalendars}
        closeModal={closeLocalCalendarModal}
        handleCalendarSelected={saveEvent}
        label={'Select a calendar'}
      />
      <Icon
        name="check-circle"
        size={24}
        color={appointmentSaved ? 'green' : 'lightgrey'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 50,
    alignSelf: 'center',
    // backgroundColor: 'yellow',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

