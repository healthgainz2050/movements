import React, {useContext, useEffect, useState} from 'react';
import {
  // Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import moment from 'moment';
// import RNCalendarEvents from 'react-native-calendar-events';
// import * as AddCalendarEvent from 'react-native-add-calendar-event';
import GlobalContext from '../../../services/context/globalContext';
// import AnimatedBounce from '../../../Components/AnimatedBounce';
import {createPDF} from '../../../components/create-pdf';
import FileViewer from 'react-native-file-viewer';
import {loadString, saveString} from '../../../utils/storage';
import {sendEmail} from './email-attachment';
/**
 *
 * {"Phone": "+92 323 502 9955", "name": "Shoaib Khazer", "patientEmail": "this.shoaib+1@gmail.com", "phone": "+92 323 502 9955", "physioEmail": "this.shoaib@gmail.com", "playlistId": "3db41dad-cfd6-4092-9bb4-c8a6c0a5f885"}
 */
const App = ({isVisible, closeModal, item}) => {
  const context = useContext(GlobalContext);
  const [filePath, setFilePath] = useState(null);
  const {playlists, selectedPatient, appUrls, user} = context;

  const playlist = playlists?.filter(
    playlist => playlist.id === item?.playlistId,
  )[0];

  useEffect(() => {
    const getFilePath = async () => {
      const path = await loadString(playlist?.id);
      setFilePath(path);
    };
    if (playlist?.id) {
      getFilePath();
    }
  }, [playlist?.id]);

  const getPlaylistDetails = () => {
    const {playlistName, exercises, id} = playlist;
    const playlistDetails = {
      documentName: playlistName.replace(/ /g, '_'),
      playlistName,
      exercises,
      createdBy: user.displayName,
      appUrls,
      assignedTo: item?.name,
      playlistId: id,
    };
    return playlistDetails;
  };

  const updateFilePath = async path => {
    setFilePath(path);
    await saveString(playlist.id, path);
  };

  const generatePDF = () => {
    const details = getPlaylistDetails();
    createPDF(details, updateFilePath);
    // closeModal(!isVisible);
  };

  const viewPDF = async () => {
    try {
      await FileViewer.open(filePath);
    } catch (error) {
      console.log('error in opening file', error);
    }
    // closeModal(!isVisible);
  };

  const emailPDF = () => {
    const {playlistName, exercises, id} = playlist;
    sendEmail({
      filePath,
      to: item?.name,
      from: user.displayName,
      playlistName: playlistName.replace(/ /g, '_'),
      appUrls,
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          closeModal(!isVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={generatePDF}>
              <Text style={styles.textStyle}>Create PDF</Text>
            </TouchableOpacity>
            {filePath ? (
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={emailPDF}>
                <Text style={styles.textStyle}>Email PDF</Text>
              </TouchableOpacity>
            ) : null}
            {filePath ? (
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={viewPDF}>
                <Text style={styles.textStyle}>View PDF</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeModal(!isVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255, 0.2)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    width: 100,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
