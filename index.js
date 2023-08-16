/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {App} from './src/navigation';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
/**until official fix
 * https://github.com/GeekyAnts/NativeBase/issues/5758
 *
 */
LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);
AppRegistry.registerComponent(appName, () => App);
