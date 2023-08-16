import React, {useContext, useState} from 'react';
import {Image} from 'react-native';
import ProgressBar from '../../../../components/HOC/ProgressBar';
import uploadWrapper from '.../../../../components/HOC/Uploader';
import {ModalHeader} from '../../../../components/modal-header';
import GlobalContext from '../../../../services/context/globalContext';
import {logVideo} from './actions';
import {Container, Text} from 'native-base';
import {NBButton} from '../../../../components/nb-button';

const AddVideoComponent = props => {
  const context = useContext(GlobalContext);
  const [state, setState] = useState({
    thumbnail: null,
  });

  let statusText = '';
  if (props.status != '0') {
    statusText = props.status === '100' ? 'Uploaded!' : 'Uploading';
  }
  const doneButton = props.completed ? (
    <NBButton
      onPress={() => logVideo(context, props, setState, state)}
      title="Done"
    />
  ) : (
    <Text />
  );

  return (
    <Container
      maxWidth="100%"
      m="10"
      justifyContent="center"
      alignItems="center">
      <ModalHeader title="Add Video" parent={props} rightText="Cancel" />
      {state.thumbnail && (
        <Image
          source={{uri: state.thumbnail}}
          style={{width: 250, height: 250, backgroundColor: 'yellow'}}
        />
      )}
      <NBButton onPress={props.pickMedia} label="Pick a video" />
      <ProgressBar percentage={props.status} />
      <Text>{statusText}</Text>
      {doneButton}
    </Container>
  );
};

export const AddVideo = uploadWrapper(AddVideoComponent);
