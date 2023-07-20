import {config} from '../../config';
import {saveString} from '../../utils/storage';
import {db, auth} from '../../Controllers/Firebase';

export const changeScreen = async (navigation, user, context) => {
  navigation.navigate('Login');
  const {uid} = user;
  if (user) {
    user.getIdToken().then((res) => {
      saveString('accessToken', res);
    });
    await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((data) => {
        let user = data.data();
        context.updateState({user: {...user, uid}});
        if (user.physio) {
          navigation.navigate('Patients', {config: config, user});
        } else {
          navigation.navigate('Playlist', {
            name: user.name,
            user,
            config: config,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return;
  }
  navigation.navigate('Login');
};

export const isLoggedIn = async (cb, _case, params = {}) => {
  switch (_case) {
    case 1:
      let user = auth.currentUser;
      cb(user, params);
      break;
    case 2:
      await auth.onAuthStateChanged((user) => {
        cb(user, params);
      });
      break;
  }
};
