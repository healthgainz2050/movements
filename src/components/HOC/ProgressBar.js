import React from 'react';
import {StyleSheet, View} from 'react-native';

export default class ProgressBar extends React.Component {
  render() {
    let width = this.props.percentage + '%';
    return (
      <View style={styles.container}>
        <View style={[styles.status, {width: width}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    height: 3,
    backgroundColor: '#f3f3f3',
  },

  status: {
    backgroundColor: 'blue',
    height: 3,
  },
});
