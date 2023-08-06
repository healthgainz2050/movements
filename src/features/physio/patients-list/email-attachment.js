import React from 'react';
import {Alert} from 'react-native';
import Mailer from 'react-native-mail';

export const sendEmail = ({to, from, filePath, appUrls, playlistName}) => {
  const body = `Dear ${to}!${'\n\n'}${from} has sent you a list of exercises routine to follow.${'\n'}Use the links below to install the application.${'\n\n'}Google Play Store: ${
    appUrls.android
  }${'\n\n'}Apple App Store: ${appUrls.ios}${'\n\n'}
      `;

  Mailer.mail(
    {
      subject: 'Please checkout this exercise list',
      recipients: ['support@example.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body,
      customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
      isHTML: true,
      attachments: [
        {
          // Specify either `path` or `uri` to indicate where to find the file data.
          // The API used to create or locate the file will usually indicate which it returns.
          // An absolute path will look like: /cacheDir/photos/some image.jpg
          // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
          path: filePath, // The absolute path of the file from which to read data.
          // uri: '', // The uri of the file from which to read the data.
          // Specify either `type` or `mimeType` to indicate the type of data.
          type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          mimeType: 'pdf', // - use only if you want to use custom type
          name: playlistName, // Optional: Custom filename for attachment
        },
      ],
    },
    (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {
            text: 'Ok',
            onPress: () => console.log('OK: Email Error Response'),
          },
          {
            text: 'Cancel',
            onPress: () => console.log('CANCEL: Email Error Response'),
          },
        ],
        {cancelable: true},
      );
    },
  );
};
