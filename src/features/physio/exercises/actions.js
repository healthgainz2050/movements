import {getPatientUser} from '../../Services/patient';
import {lowerCase} from '../../utils';

export const fetchPatientUser = async () => {
  const {selectedPatient} = context;
  const patientUser = await getPatientUser(
    lowerCase(selectedPatient.patientEmail),
  );
  setState({...state, patientUser});
};
