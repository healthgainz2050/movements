import React, {useContext, useEffect, useState} from 'react';
import SubscribeToCollection from '../../../HOC/List';
import {Content, Container} from '@native-base';
import {Platform, View, Dimensions, Text} from 'react-native';
import {HeaderBackButton, HeaderTitle} from 'react-navigation-stack';
import {PieChart} from 'react-native-chart-kit';
import {calculateSentiments} from './actions';
import GlobalContext from '../../../context/globalContext';
import {pieChartConfig} from './ChartConfigs';

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
  console.log('totalpopulation is', totalPopulation);
  return (
    <Container>
      <Content style={{backgroundColor: 'white', margin: 15}}>
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
      </Content>
    </Container>
  );
};

const VideoSentiments = SubscribeToCollection('exercises')(
  VideoSentimentsComponent,
);

VideoSentiments.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'Exercise Feedbacks'} />,
    headerLeft: () => (
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
        backTitleVisible={Platform.OS == 'ios' ? true : false}
      />
    ),
  };
};

export default VideoSentiments;
