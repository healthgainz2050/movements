import React from 'react';
import {Box, Container, Text, Divider, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export const ExerciseRow = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      maxWidth="100%"
      mt="2"
      mb="2"
      onPress={() =>
        navigation.navigate('ExerciseDetail', {
          name: item?.name,
          item: item,
        })
      }>
      <Container p="2" border="1" noIndent maxWidth="100%">
        <Text bold>{item?.name} life is full of love and plesure</Text>
        {item.reps || item.sets || item.hold ? (
          <Text>
            {item.reps ? `Reps ${item.reps}  ` : null}
            {item.sets ? `Sets ${item.sets}  ` : null}
            {item.hold ? `Hold ${item.hold}  ` : null}
          </Text>
        ) : null}
      </Container>
      <Divider mt="4" />
    </Pressable>
  );
};
