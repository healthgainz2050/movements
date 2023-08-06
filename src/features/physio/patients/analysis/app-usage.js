import React, {useContext, useEffect, useState} from 'react';
import SubscribeToCollection from '../../../../components/HOC/list-of-users';
import {Center, Container, Button, HStack} from 'native-base';
import {View, Dimensions, Text} from 'react-native';
import {NBButton} from '../../../../components/nb-button';
import {LineChart} from 'react-native-chart-kit';
import GlobalContext from '../../../../services/context/globalContext';
import moment from 'moment';
import {
  compare,
  getLabels,
  getDataSet,
  getUsageStats,
  onCurrentPress,
  onNextPress,
  onPreviousPress,
} from './actions';
import {lineChartConfig} from './chart-config';
const windowWidth = Dimensions.get('window').width;

const AppUsageComponent = () => {
  const context = useContext(GlobalContext);
  const {user, activePatient} = context;
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [selectedRange, setRange] = useState({
    firstDate: moment().subtract(6, 'days'),
    secondDate: moment(),
  });
  
  useEffect(() => {
    getUsageStats(setIsLoading, setStats, activePatient);
  }, []);

  const isNextEnabled = compare(selectedRange.secondDate, new Date()) === -1;
  const isCurrentEnabled = compare(selectedRange.secondDate, new Date()) !== 0;
  const {firstDate, secondDate} = selectedRange;
  const dataSet = getDataSet(firstDate, stats);
  const data = {
    labels: getLabels(firstDate),
    datasets: [
      {
        data: dataSet,
        color: (opacity = 1) => `rgba(55, 159, 239, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Usage Stats in Mins'],
  };
  return (
    <Container maxWidth="100%" p="3">
      <Text>
        Application Usage ({`${moment(selectedRange.firstDate).format('ll')}`} -{' '}
        {`${moment(selectedRange.secondDate).format('ll')}`})
      </Text>
      <HStack justifyContent="space-between" mt="5" mb="5">
        <Button
          onPress={() => onPreviousPress(selectedRange, setRange)}
          backgroundColor="#007aff">
          Previous Week
        </Button>
        <Button
          ml="2"
          mr="2"
          onPress={() => onCurrentPress(setRange)}
          backgroundColor={!isCurrentEnabled ? '#61677A' : '#007aff'}
          disabled={!isCurrentEnabled}>
          Current Week
        </Button>
        <Button
          onPress={() => onNextPress(selectedRange, setRange)}
          disabled={!isNextEnabled}
          backgroundColor={!isNextEnabled ? '#61677A' : '#007aff'}>
          Next Week
        </Button>
      </HStack>
      <LineChart
        data={data}
        width={windowWidth * 0.95}
        height={220}
        style={{alignSelf: 'center'}}
        chartConfig={lineChartConfig}
      />
    </Container>
  );
};

const AppUsage = SubscribeToCollection('exercises')(AppUsageComponent);

export default AppUsage;
