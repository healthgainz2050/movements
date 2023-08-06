import {
  getVideoSentiments,
  getAppUsageStats,
} from '../../../../services/firebase';
import {EMOJI_TYPES} from '../../../../components/feedback-modal/emoji/constants';
import moment from 'moment';

const fontSize = 11;
export const calculateSentiments = async (
  setIsLoading,
  setSentiments,
  activePatient,
) => {
  try {
    setIsLoading(true);
    const videoSentiments = await getVideoSentiments(
      activePatient?.patientEmail,
    );
    const sentimentalValues = {
      happy: {
        population: 0,
        color: '#AADEA7',
        name: EMOJI_TYPES['happy'],
        legendFontColor: '#262424',
        legendFontSize: fontSize,
      },
      veryHappy: {
        population: 0,
        color: '#64C2A6',
        name: EMOJI_TYPES['veryHappy'],
        legendFontColor: '#262424',
        legendFontSize: fontSize,
      },
      neutral: {
        population: 0,
        color: '#E6F69D',
        name: EMOJI_TYPES['neutral'],
        legendFontColor: '#262424',
        legendFontSize: fontSize,
      },
      sad: {
        population: 0,
        color: '#DDDDDD',
        name: EMOJI_TYPES['sad'],
        legendFontColor: '#262424',
        legendFontSize: fontSize,
      },
      verySad: {
        population: 0,
        color: '#A9A9A9',
        name: EMOJI_TYPES['verySad'],
        legendFontColor: '#262424',
        legendFontSize: fontSize,
      },
    };
    videoSentiments?.map((item, index) => {
      sentimentalValues[item?.sentiment].population += 1;
    });
    console.log('@@@ sentiments are', Object.values(sentimentalValues));
    setSentiments(Object.values(sentimentalValues));
    setIsLoading(false);
  } catch (error) {
    console.log('error in loading sentiments', error);
  } finally {
    setIsLoading(false);
  }
};

export const compare = (dateTimeA, dateTimeB) => {
  var momentA = moment(dateTimeA).format('YYYY-MM-DD');
  var momentB = moment(dateTimeB).format('YYYY-MM-DD');
  if (momentA > momentB) return 1;
  else if (momentA < momentB) return -1;
  else return 0;
};

export const getLabels = startDate => {
  const labels = [];
  for (let i = 0; i < 7; i++) {
    labels.push(moment(startDate).add(i, 'days').format('ddd DD'));
  }
  return labels;
};

export const getDataSet = (firstDate, stats) => {
  if (!stats || stats.length === 0) return [0, 0, 0, 0, 0, 0, 0];
  const dataSet = [];
  for (let i = 0; i < 7; i++) {
    const key = moment(firstDate).add(i, 'days').format('DD-MM-YY');
    let usage = stats[0][key]?.usage ? stats[0][key]?.usage / 1000 / 60 : 0;
    usage = Math.round((usage + Number.EPSILON) * 100) / 100;
    dataSet.push(usage || 0.00001);
  }
  return dataSet;
};

export const getUsageStats = async (setIsLoading, setStats, activePatient) => {
  try {
    setIsLoading(true);
    const appStats = await getAppUsageStats(activePatient?.patientEmail);
    setStats(appStats);
  } catch (error) {
    console.log('app usage stats error', error);
  } finally {
    setIsLoading(false);
  }
};

export const onNextPress = (selectedRange, setRange) => {
  const {firstDate, secondDate} = selectedRange;
  setRange({
    firstDate: moment(secondDate),
    secondDate: moment(secondDate).add(6, 'days'),
  });
};
export const onPreviousPress = (selectedRange, setRange) => {
  const {firstDate, secondDate} = selectedRange;
  setRange({
    firstDate: moment(firstDate).subtract(6, 'days'),
    secondDate: moment(firstDate),
  });
};
export const onCurrentPress = setRange => {
  setRange({
    firstDate: moment().subtract(6, 'days'),
    secondDate: moment(),
  });
};
