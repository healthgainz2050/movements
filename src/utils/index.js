import {Share, Dimensions, Linking} from 'react-native';

export const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Please check this amazing application',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log('sharing error', error.message);
  }
};

export const getYouTubeVideoId = (uri) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = uri?.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

export const getGDriveVideoUrl = (uri) => {
  if (uri?.indexOf('drive.google.com') !== -1) {
    const updatedUri = uri?.replace('view?usp=sharing', 'preview');
    return `<iframe width="100%" height="100%" allow="autoplay" src="${updatedUri}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }
  return null;
};

export const lowerCase = (str) => {
  return str?.toLowerCase();
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const sendEmail = async (to, from, appUrls) => {
  const body = `Dear ${to.name}!${'\n\n'}${
    from.displayName
  } has invited you to use Healthgainz to collaborate with them.${'\n'}Use the links below to install the application.${'\n\n'}Google Play Store: ${
    appUrls.android
  }${'\n\n'}Apple App Store: ${appUrls.ios}${'\n\n'}
  `;
  const subject = `Invitation to use Healthgainz to collaborate with ${from.displayName}`;
  let url = `mailto:${to.patientEmail}?subject=${subject}&body=${body}`;
  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error('Provided URL can not be handled');
  }

  return Linking.openURL(url);
};

// const downloadFileTest = (background, url) => {
//   let jobId = 1;
//   if (jobId !== -1) {
//     this.setState({output: 'A download is already in progress'});
//   }

//   const progress = (data) => {
//     const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
//     const text = `Progress ${percentage}%`;
//     this.setState({output: text});
//   };

//   const begin = (res) => {
//     this.setState({output: 'Download has begun'});
//   };

//   const progressDivider = 1;

//   this.setState({imagePath: {uri: ''}});

//   // Random file name needed to force refresh...
//   const downloadDest = `${RNFS.DocumentDirectoryPath}/${
//     (Math.random() * 1000) | 0
//   }.mp4`;

//   const ret = RNFS.downloadFile({
//     fromUrl: url,
//     toFile: downloadDest,
//     begin,
//     progress,
//     background,
//     progressDivider,
//   });

//   jobId = ret.jobId;

//   ret.promise
//     .then((res) => {
//       this.setState({output: JSON.stringify(res)});
//       this.setState({imagePath: {uri: 'file://' + downloadDest}});

//       jobId = -1;
//     })
//     .catch((err) => {
//       this.showError(err);

//       jobId = -1;
//     });
// };

// const downloadFile = (background, url) => {
//   const progress = (data) => {
//     const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;

//     return `Progress ${percentage}%`;
//   };

//   const begin = (res) => {
//     this.setState({output: 'Download has begun'});
//   };

//   const progressDivider = 1;

//   this.setState({imagePath: {uri: ''}});

//   // Random file name needed to force refresh...
//   const downloadDest = `${RNFS.DocumentDirectoryPath}/${
//     (Math.random() * 1000) | 0
//   }.mp4`;

//   const ret = RNFS.downloadFile({
//     fromUrl: url,
//     toFile: downloadDest,
//     begin,
//     progress,
//     background,
//     progressDivider,
//   });

//   jobId = ret.jobId;

//   ret.promise
//     .then((res) => {
//       this.setState({output: JSON.stringify(res)});
//       this.setState({imagePath: {uri: 'file://' + downloadDest}});

//       jobId = -1;
//     })
//     .catch((err) => {
//       this.showError(err);

//       jobId = -1;
//     });
// };
