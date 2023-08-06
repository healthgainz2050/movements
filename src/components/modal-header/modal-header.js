import React from 'react';
import {Button, HStack, Heading, Text, Flex, Center} from 'native-base';
import {Platform} from 'react-native';
import {styles} from './styles';
import {Cone} from '../top-curve';
import {useNavigation} from '@react-navigation/native';

export const ModalHeader = props => {
  const navigation = useNavigation();

  return (
    <HStack bg="red" justifyContent="center">
      <Flex
        h={20}
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        width="100%">
        <Button size="sm" variant="outline" onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>{props.rightText}</Text>
        </Button>
        <Heading size="sm">{props.title}</Heading>
        <Center>{Platform.OS === 'ios' && <Cone variant="modal" />}</Center>
      </Flex>
    </HStack>
  );
};
