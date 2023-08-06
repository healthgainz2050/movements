import React from 'react';
import {Button, Text, View, ActivityIndicator, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';
import {storage, db} from './../Controllers/Firebase';
import uuid from 'uuid';
import ProgressBar from './ProgressBar';
import {Container, Body, Content, List, ListItem} from '@native-base';
// import {createThumbnail} from 'react-native-create-thumbnail';
// import * as Font from 'expo-font'

/*
Uploader

TODOS

Dynamically change Video / Photos etc.

*/

/*
 * Example UI component
 * This can be designed however one wants.
 *
 */

const ExampleUploader = (props) => {
  let statusText = '';
  if (props.status != '') {
    statusText = props.status == '100' ? 'Done!' : 'Uploading';
  }

  if (props.status == true) {
    // post to firebase db
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
      <Button onPress={props.pickMedia} title="Pick a video from camera roll" />
      <ProgressBar percentage={props.status} />
      <Text>{statusText}</Text>
    </View>
  );
};

/*

submitForm = async () => {
    try {
        let docRef = await db.collection(path).add(this.state);   // // console.log("submitted", docRef.id);
        this.setState({submitted: docRef.id});
    } catch (error) {
        // console.log(error);
    }
};

*/

/*
 *
 *
 * Wrapper Component
 *
 *
 */

// const withFilterProps = BaseComponent => ({ mediaType, side }) => {

const uploaderWrapper = (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      url: '',
      uploading: false,
      loading: false,
      status: '0',
      completed: false,
      fontLoaded: false,
    };

    async componentDidMount() {
      // await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // await Permissions.askAsync(Permissions.CAMERA);
      // await Font.loadAsync({
      //     Roboto: require("./../../node_modules/native-base/Fonts/Roboto.ttf"),
      //     Roboto_medium: require("./../../node_modules/native-base/Fonts/Roboto_medium.ttf")
      // });
      this.setState({fontLoaded: true});
    }
    // generateThumbnail = async () => {
    //   createThumbnail({
    //     url:'https://firebasestorage.googleapis.com/v0/b/healthgainz2324.appspot.com/o/d0e08c94-5b30-481a-a349-b2ed6a8ce7c6?alt=media&token=3a999bad-65a7-49c6-bb8f-691ec4eb98ca.mp4',
    //     timeStamp: 10000,
    //   })
    //     .then((response) => {
    //       // console.log('thumbnail response is', response);
    //     })
    //     .catch((err) => // console.log({err}));
    // };

    uploadImageAsync = async (uri) => {
      this.setState({loading: true});
      const response = await fetch(uri);
      const blob = await response.blob();
      // create a path.
      const ref = storage.child(uuid.v4());
      const uploadTask = ref.put(blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          let progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);
          this.setState({status: progress});
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
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
      } catch (error) {
        console.log('error in pickMedia', error);
      }
    };

    handleImagePicked = async (pickerResult) => {
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
      if (this.state.fontLoaded)
        return (
          <WrappedComponent
            pickMedia={this.pickMedia}
            completed={this.state.completed}
            status={this.state.status}
            url={this.state.url}
            {...this.props}
          />
        );
      return (
        <ActivityIndicator
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            width: '100%',
            zIndex: 2,
            translateY: -10,
          }}
          size="large"
          color={'grey'}
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
