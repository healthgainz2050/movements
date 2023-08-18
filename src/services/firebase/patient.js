import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../utils';

const fetchAllPatients = async physioEmail => {
  try {
    const patientsDocs = await firestore()
      .collection('patients')
      .where('physioEmail', '==', lowerCase(physioEmail))
      .get();
    const patients = [];
    patientsDocs?.forEach(function (doc) {
      patients.push(doc?.data());
    });
    return patients;
  } catch (error) {
    console.error('@@@ error in fetchAllPatients', error);
    return [];
  }
};

const fetchAppUrls = async () => {
  try {
    const appUrlDocs = await firestore().collection('app-urls').get();
    const appUrls = [];
    appUrlDocs.forEach(function (doc) {
      appUrls.push(doc.data());
    });
    return appUrls[0];
  } catch (error) {
    console.error('@@@ error in fetchAppUrls', error);
    return [];
  }
};

const getPatientUser = async patientEmail => {
  try {
    const patientsUserDocs = await firestore()
      .collection('users')
      .where('email', '==', lowerCase(patientEmail))
      .get();
    const patientUser = [];
    patientsUserDocs.forEach(function (doc) {
      patientUser.push(doc.data());
    });
    return patientUser;
  } catch (error) {
    console.error('@@@ error in getPatientUser', error);
    return [];
  }
};

const getPatient = async patientEmail => {
  try {
    const patientsUserDocs = await firestore()
      .collection('patients')
      .where('patientEmail', '==', lowerCase(patientEmail))
      .get();
    const patientUser = [];
    patientsUserDocs.forEach(function (doc) {
      patientUser.push(doc.data());
    });
    return patientUser[0];
  } catch (error) {
    console.error('@@@ error in getPatient', error);
    return [];
  }
};

export {fetchAllPatients, fetchAppUrls, getPatientUser, getPatient};

export default {
  fetchAllPatients,
  fetchAppUrls,
  getPatientUser,
  getPatient,
};
