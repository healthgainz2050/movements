/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/navigation/root-navigation';
import {Splash as App} from './src/features/auth/splash';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
