import React from 'react';
import GlobalProvider from '../services/context/globalProvider';
import {NativeBaseProvider} from 'native-base';
import {RootNavigation} from './root-navigation';
import {Cone} from '../components/top-curve';
export const App = () => {
  return (
    <NativeBaseProvider>
      <GlobalProvider>
        <Cone />
        <RootNavigation />
      </GlobalProvider>
    </NativeBaseProvider>
  );
};
