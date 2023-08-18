import React, {useEffect} from 'react';
import GlobalProvider from '../services/context/globalProvider';
import {NativeBaseProvider} from 'native-base';
import {RootNavigation} from './root-navigation';
import {StripeProvider} from '@stripe/stripe-react-native';
import {Cone} from '../components/top-curve';

export const App = () => {
  return (
    <StripeProvider
      publishableKey={'publishable_key'} //put publishable key here
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <NativeBaseProvider>
        <GlobalProvider>
          <Cone />
          <RootNavigation />
        </GlobalProvider>
      </NativeBaseProvider>
    </StripeProvider>
  );
};
