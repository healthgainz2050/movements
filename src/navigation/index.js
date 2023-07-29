import React from 'react';
import GlobalProvider from '../services/context/globalProvider';
import {NativeBaseProvider} from 'native-base';
import {RootNavigation} from './root-navigation';

export const App = () => {
  return (
    <NativeBaseProvider>
      <GlobalProvider>
        <RootNavigation />
      </GlobalProvider>
    </NativeBaseProvider>
  );
};
