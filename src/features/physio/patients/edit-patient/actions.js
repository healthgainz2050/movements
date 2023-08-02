import {db} from '../../../Controllers/Firebase';

export const submitForm = async (data, state, navigation) => {
  await db
    .collection('patients')
    .where('patientEmail', '==', data.patientEmail)
    .get()
    .then((docs) => {
      docs.forEach(function (doc) {
        doc.ref
          .update({
            name: state.name,
            patientEmail: state.email,
            phone: state.phone,
          })
          .then((res) => {
            navigation.navigate('Patients');
          });
      });
    });
  navigation.getParam('syncPatients')();
};
