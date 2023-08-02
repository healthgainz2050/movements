import React, {useContext, useState} from 'react';
import {Button, Text, View, Image} from 'react-native';
import ProgressBar from '../../../HOC/ProgressBar';
import uploadWrapper from '../../../HOC/Uploader';
import {ModalHeader} from '../../../Components/ModalHeader';
import GlobalContext from '../../../context/globalContext';
import {logVideo} from './actions';
import {Container} from '@native-base';

function AddVideo(props) {
  const context = useContext(GlobalContext);
  const [state, setState] = useState({
    thumbnail: null,
  });

  let statusText = '';
  if (props.status != '0') {
    statusText = props.status === '100' ? 'Uploaded!' : 'Uploading';
  }
  const doneButton = props.completed ? (
    <Button
      onPress={() => logVideo(context, props, setState, state)}
      title="Done"
    />
  ) : (
    <Text> </Text>
  );

  return (
    <Container>
      <ModalHeader title="Add Video" parent={props} rightText="Cancel" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {state.thumbnail && (
          <Image
            source={{uri: state.thumbnail}}
            style={{width: 250, height: 250, backgroundColor: 'yellow'}}
          />
        )}
        <Button onPress={props.pickMedia} title="Pick a video" />
        <ProgressBar percentage={props.status} />
        <Text>{statusText}</Text>
        {doneButton}
      </View>
    </Container>
  );
}

export default uploadWrapper(AddVideo);
