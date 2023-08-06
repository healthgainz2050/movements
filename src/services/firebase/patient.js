import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../utils';

const fetchAllPatients = async physioEmail => {
  console.log('@@@ fetchAll Patients', physioEmail);
  try {
    const patientsDocs = await firestore()
      .collection('patients')
      .where('physioEmail', '==', lowerCase(physioEmail))
      .get();
    const patients = [];
    console.log('@@@ 1 Patients', patients);
    patientsDocs?.forEach(function (doc) {
      patients.push(doc?.data());
    });
    console.log('@@@ 2 Patients', patients);
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

export {fetchAllPatients, fetchAppUrls, getPatientUser};

export default {
  fetchAllPatients,
  fetchAppUrls,
  getPatientUser,
};
