import React, {useContext, useEffect, useState} from 'react';
import SubscribeToCollection from '../../../HOC/List';
import {Content} from '@native-base';
import {Platform, View, Dimensions, Text} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {Button} from '../../../Components/Button';
import {LineChart} from 'react-native-chart-kit';
import GlobalContext from '../../../context/globalContext';
import moment from 'moment';
import {HeaderTitle} from '../../../Components/HeaderTitle';
import {Container} from '@native-base';
import {
  compare,
  getLabels,
  getDataSet,
  getUsageStats,
  onCurrentPress,
  onNextPress,
  onPreviousPress,
} from './actions';
import {lineChartConfig} from './ChartConfigs';
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
  console.log('@@@@ firstD', getDataSet(firstDate, stats));
  return (
    <Container>
      <Content style={{backgroundColor: 'white', margin: 15}}>
        <View>
          <Text>
            Application Usage (
            {`${moment(selectedRange.firstDate).format('ll')}`} -{' '}
            {`${moment(selectedRange.secondDate).format('ll')}`})
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Button
              text="Previous Week"
              primary
              onPress={() => onPreviousPress(selectedRange, setRange)}
            />
            <Button
              text="Current Week"
              onPress={() => onCurrentPress(setRange)}
              primary={isCurrentEnabled}
              disabled={!isCurrentEnabled}
            />
            <Button
              text="Next Week"
              onPress={() => onNextPress(selectedRange, setRange)}
              primary={isNextEnabled}
              disabled={!isNextEnabled}
            />
          </View>
          <LineChart
            data={data}
            width={windowWidth * 0.95}
            height={220}
            chartConfig={lineChartConfig}
          />
        </View>
      </Content>
    </Container>
  );
};

const AppUsage = SubscribeToCollection('exercises')(AppUsageComponent);

AppUsage.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => <HeaderTitle title={'App Usage'} />,
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

export default AppUsage;
