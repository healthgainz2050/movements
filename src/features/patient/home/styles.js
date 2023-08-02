import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 250,
    backgroundColor:'#D3D3D3',
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
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
