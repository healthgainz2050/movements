import {assignPlaylistToPatient} from '../../../../Services/playlist';

export const updatePlaylistId = async (patientEmail, playlistId, context) => {
  await assignPlaylistToPatient(patientEmail, playlistId);
  let selectedPatient = {};
  const updatedPatients = context.patients.map((patient) => {
    if (patient.patientEmail === patientEmail) {
      patient.playlistId = playlistId;
      selectedPatient = patient;
    }
    return patient;
  });
  context.updateState({
    patients: updatedPatients,
    selectedPatient,
  });
};
