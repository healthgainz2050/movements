import React from 'react';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export const StripeSetup = () => {
  const navigation = useNavigation();
  const stripeSetup = async () => {
    navigation.navigate('SetupPaymentScreen');
  };
  return (
    <Button
      onPress={stripeSetup}
      variant="link"
      mr="5"
      _text={{color: '#007aff'}}>
      Payments
    </Button>
  );
};
