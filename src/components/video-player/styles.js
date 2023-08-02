import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '../../utils';

export const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 250,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoSelectionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    marginTop: 20,
    width: windowWidth * 1,
    height: windowHeight * 0.2,
  },
});
