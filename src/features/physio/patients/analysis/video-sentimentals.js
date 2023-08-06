import React, {useContext, useEffect, useState} from 'react';
import SubscribeToCollection from '../../../../components/HOC/list-of-users';
import {Center, Container} from 'native-base';
import {View, Dimensions, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {calculateSentiments} from './actions';
import GlobalContext from '../../../../services/context/globalContext';
import {pieChartConfig} from './chart-config';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const VideoSentimentsComponent = () => {
  const context = useContext(GlobalContext);
  const {user, activePatient} = context;
  const [isLoading, setIsLoading] = useState(false);
  const [sentiments, setSentiments] = useState(null);

  useEffect(() => {
    calculateSentiments(setIsLoading, setSentiments, activePatient);
  }, []);

  let totalPopulation = 0;
  for (const key in sentiments) {
    totalPopulation += sentiments[key].population;
  }

  return (
    <Container p="5" maxWidth="100%">
      <Center>
        <View>
          <Text>
            {totalPopulation > 0
              ? 'Exercise Feedbacks'
              : `Can't find any Exercise's feedback`}
          </Text>
          {totalPopulation > 0 ? (
            <PieChart
              data={sentiments || []}
              width={windowWidth * 0.8}
              height={windowHeight * 0.3}
              chartConfig={pieChartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={15}
              center={[10, 10]}
            />
          ) : null}
        </View>
      </Center>
    </Container>
  );
};

const VideoSentiments = SubscribeToCollection('exercises')(
  VideoSentimentsComponent,
);

export default VideoSentiments;
