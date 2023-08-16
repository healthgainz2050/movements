import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../utils';

const addAppointment = data => {
  const appointment = {
    alarms: [{date: '2021-05-23T20:42:22.000Z'}],
    attendees: [],
    endDate: '2021-05-24T01:32:22.000Z',
    calendar: {
      allowsModifications: true,
      allowedAvailabilities: ['busy', 'free'],
      source: 'this.test222@gmail.com',
      type: 'com.google',
      title: 'this.test222@gmail.com',
      isPrimary: true,
      color: '#9FE1E7',
      id: '2',
    },
    startDate: '2021-05-23T20:32:22.000Z',
    availability: 'busy',
    description: 'Please be there on time',
    location: '',
    allDay: false,
    title: 'Appointment',
    id: '1',
  };
  const createdBy = 'this.shoaib@gmail.com';
  const cretaedFor = 'Anna.bill@gmail.com';
};

/**
 * this api returns all appointments created for a specific person
 * patientEmail (is the person for which we have created the appointment)
 * physioEmail (is the person for who have created the appointment)
 */

const getAppointment = async createdFor => {
  // const createdBy = 'this.shoaib@gmail.com';
  // const cretaedFor = 'Anna.bill@gmail.com';

  let appointmentsDocs = await firestore()
    .collection('appointments')
    .where('patientEmail', '==', lowerCase(createdFor))
    .get();
  const appointments = [];
  appointmentsDocs?.forEach(function (doc) {
    appointments.push(doc.data());
  });
  return appointments[0] || null;
};

export {addAppointment, getAppointment};

export default {
  addAppointment,
  getAppointment
};
