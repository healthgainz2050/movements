import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {colors} from '../colors';
import {fetchPublishableKey} from '../helpers';

export const PaymentScreen = ({paymentMethod, children, onInit}) => {
  return (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="always">
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});
