import {AppRegistry} from 'react-native';
import TestApp from './src/TestApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => TestApp);
