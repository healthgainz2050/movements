import React from 'react';
import {Box, Container, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export const ExerciseRow = ({item}) => {
  const navigation = useNavigation();
  return (
    <Container
      noIndent
      onPress={() =>
        navigation.navigate('ExerciseDetail', {
          name: item?.name,
          item: item,
        })
      }>
      <Box>
        <Text bold>{item?.name}</Text>
        {item.reps || item.sets || item.hold ? (
          <Text note numberOfLines={1}>
            {item.reps ? `Reps ${item.reps}  ` : null}
            {item.sets ? `Sets ${item.sets}  ` : null}
            {item.hold ? `Hold ${item.hold}  ` : null}
          </Text>
        ) : null}
      </Box>
    </Container>
  );
};
