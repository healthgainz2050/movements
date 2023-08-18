import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  video: {
    width: 100,
    height: 150,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    width: '68%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    height: 50,
  },
  slider: {width: '30%', height: 40, marginLeft: 10},
  autoText: {marginLeft: 10, marginRight: 20},
});
