import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const VideoInfoDisplay = ({videoInfo}) => {
  const sizeInMB = (videoInfo.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB
  const durationInSeconds = Math.floor(videoInfo.duration / 1000); // Convert ms to seconds
  const durationDisplay =
    durationInSeconds < 60
      ? `${durationInSeconds} seconds`
      : `${Math.floor(durationInSeconds / 60)} mins`;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Information:</Text>
      <Text>Filename: {videoInfo.filename}</Text>
      <Text>Duration: {durationDisplay}</Text>
      <Text>Size: {sizeInMB} MB</Text>
      <Text>
        Dimensions: {videoInfo.width} x {videoInfo.height}
      </Text>
      <Text>MIME Type: {videoInfo.mime}</Text>
      {/* Display other properties as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
