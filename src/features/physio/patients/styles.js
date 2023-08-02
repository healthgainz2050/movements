import {StyleSheet} from 'react-native';
import {windowWidth} from '../../utils';

export const styles = StyleSheet.create({
  pdf: {
    width: windowWidth * 0.2,
    height: '100%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  analysis: {
    width: windowWidth * 0.3,
    height: '100%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
  },
  diary: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'deepskyblue',
  },
  edit: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'deepskyblue',
  },
  delete: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
