import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 0,
  },
  loginText: {
    color: '#3D9DF2',
    marginTop: 25,
    textAlign: 'center',
    width: 100,
    height: 100,
  },
  gdpr: {
    alignSelf: 'flex-start',
    textAlign: 'right',
    backgroundColor: '#fff',
    color: 'black',
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  signUpMessage: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    // width: 150,
    // height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoMsg: {
    color: '#000000',
    alignSelf: 'center',
    marginRight: 20,
  },
  googleBtn: {
    backgroundColor: '#3D9DF2',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  alreadyBtn: {
    alignSelf: 'center',
    color: '#3629C5',
    paddingTop: 10,
    paddingEnd: 30,
  },
  tapText: {
    color: '#3629C5',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  urlText: {color: '#3629C5', alignSelf: 'center', fontWeight: 'bold'},
  mb20: {
    marginBottom: 20,
  },
});
