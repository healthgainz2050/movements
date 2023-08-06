import React, {Component} from 'react';

import {Text, TouchableHighlight, View} from 'react-native';
import {createHTML} from './pdf-html';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export const createPDF = async (details, setFilePath) => {
  try {
    const {documentName} = details;

    let options = {
      html: createHTML(details),
      fileName: documentName,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);

    setFilePath(file.filePath);
    alert(`${documentName} created successfully`);
  } catch (error) {
    console.log('error in createPDF', error);
  }
};

export const CreatePDF = () => {
  const createPDsF = async () => {
    let options = {
      html: createHTML(),
      fileName: 'test',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };

  return (
    <View>
      <TouchableHighlight onPress={createPDsF}>
        <Text>Create PDF</Text>
      </TouchableHighlight>
    </View>
  );
};
