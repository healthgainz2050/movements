import React from 'react';
import {Button, Text, View, ActivityIndicator, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {generateUUID} from '../../utils/uuid-generator';
import ProgressBar from './ProgressBar';

import storage from '@react-native-firebase/storage';

const storageRef = storage().ref();

const uploaderWrapper = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      url: '',
      uploading: false,
      loading: false,
      status: '0',
      completed: false,
    };

    uploadImageAsync = async uri => {
      this.setState({loading: true});
      const response = await fetch(uri);
      const blob = await response.blob();
      // create a path.
      const fileRef = storageRef.child('videos/' + generateUUID());
      const uploadTask = fileRef.put(blob);

      uploadTask.on(
        'state_changed',
        snapshot => {
          let progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);
          this.setState({status: progress});
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            // console.log('uploadTask', downloadURL);
            this.setState({url: downloadURL, completed: true});
            // use this to add to video list.
            return downloadURL;
          });
        },
      );
    };

    pickMedia = async () => {
      try {
        let pickerResult = await ImagePicker.openPicker({
          // cropping: true,
          mediaType: 'video', // Neds to to be props based.
        });
        this.handleImagePicked(pickerResult);
        return pickerResult;
      } catch (error) {
        console.log('error in pickMedia', error);
      }
    };

    handleImagePicked = async pickerResult => {
      try {
        // this.setState({ status: "starting upload" });
        this.setState({uploading: true});
        const uploadFilePath =
          Platform.OS === 'ios' ? pickerResult.sourceURL : pickerResult.path;
        // if (!pickerResult.cancelled) {
        let uploadUrl = await this.uploadImageAsync(uploadFilePath);
        this.setState({image: uploadUrl});
        // }
      } catch (e) {
        console.log('error in uploading', e);
        // this.setState({ status: "Upload failed, sorry :(" });
      } finally {
        this.setState({uploading: false});
      }
    };

    render() {
      return (
        <WrappedComponent
          pickMedia={this.pickMedia}
          completed={this.state.completed}
          status={this.state.status}
          url={this.state.url}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

export default uploaderWrapper;

// const Uploader = uploaderWrapper(ExampleUploader);

// export default Uploader;

/*

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };


  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    } else {
        <View />
    }
  };



  */
