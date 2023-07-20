import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#342C92',
    marginTop: 25,
    textAlign: 'center',
    fontWeight: "bold"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 5,
  },
  welcomeMessage: {
    alignSelf: 'center',
    paddingBottom: 0,
    paddingTop: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  signInMessage: {
    alignSelf: 'center',
    paddingBottom: 20,
    paddingTop: 5,
    fontSize: 16,
  },
  googleBtn: {
    width: 342,
    height: 48,
    backgroundColor: '#3D9DF2',
    marginTop: 5,
  },
});
