import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../colors';

export const StripeButton = ({
  title,
  variant = 'default',
  disabled,
  loading,
  onPress,
  ...props
}) => {
  const titleElement = React.isValidElement(title) ? (
    title
  ) : (
    <Text style={[styles.text, variant === 'primary' && styles.textPrimary]}>
      {title}
    </Text>
  );
  return (
    <View style={disabled && styles.disabled}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          variant === 'primary' && styles.primaryContainer,
        ]}
        onPress={onPress}
        {...props}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          titleElement
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryContainer: {
    backgroundColor: colors.slate,
    alignItems: 'center',
  },
  text: {
    color: colors.slate,
    fontWeight: '600',
    fontSize: 16,
  },
  textPrimary: {
    color: colors.white,
  },
  disabled: {
    opacity: 0.3,
  },
});
