import React from 'react';
import {Body, ListItem} from '@native-base';
import {Text} from 'react-native';

export const renderRow = (item, navigation) => {
  return (
    <ListItem
      noIndent
      onPress={() =>
        navigation.navigate('ExerciseDetail', {
          name: item?.name,
          item: item,
        })
      }>
      <Body>
        <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
        {item.reps || item.sets || item.hold ? (
          <Text note numberOfLines={1}>
            {item.reps ? `Reps ${item.reps}  ` : null}
            {item.sets ? `Sets ${item.sets}  ` : null}
            {item.hold ? `Hold ${item.hold}  ` : null}
          </Text>
        ) : null}
      </Body>
    </ListItem>
  );
};
