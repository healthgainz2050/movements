import React, {useState, useContext} from 'react';
import {
  Alert,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import FeedbackModal from './feedback-modal';
import {EMOJI_TYPES} from './emoji/constants';
import GlobalContext from '../../services/context/globalContext';
import {addSentimentToExercise} from '../../services/firebase/analytics';
import {styles} from './styles';
import {emojis} from '../../assets/emojis';

const App = ({item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const context = useContext(GlobalContext);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.headerText}>How was your experience?</Text>
            <FeedbackModal setSentiment={setSentiment} />
            <Text style={styles.sentimentText}>{EMOJI_TYPES[sentiment]}</Text>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#3862CF'}}
              onPress={async () => {
                setModalVisible(!modalVisible);
                await addSentimentToExercise(
                  item?.id,
                  context?.user?.uid,
                  context?.user?.email,
                  sentiment,
                );
              }}>
              <Text style={styles.textStyle}>Done</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image source={emojis.happy} style={{height: 25, width: 25}} />
      </TouchableOpacity>
    </View>
  );
};

export default App;
