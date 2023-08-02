import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {lowerCase} from '../../utils';

export const addSentimentToExercise = async (
  exerciseId,
  userId,
  email,
  sentiment,
) => {
  try {
    const data = {
      [lowerCase(email)]: {
        exerciseId,
        userId,
        sentiment,
        email: lowerCase(email),
      },
    };
    var sentimentRef = firestore().collection('/sentiments/').doc(exerciseId);
    await sentimentRef.set(data, {merge: true});
  } catch (error) {
    console.log('@@@ error in writing sentiments', error);
  }
};

export const reportAppUsageTime = async (userId, email, startTime, usage) => {
  try {
    const startTimeKey = moment(startTime).format('DD-MM-YY');
    let usageDocs = await firestore()
      .collection('/appUsage/')
      .where('userId', '==', userId)
      .get();
    let previousUsage = 0;
    usageDocs?.forEach((doc, index) => {
      if (doc?.data()[startTimeKey]) {
        previousUsage = doc?.data()[startTimeKey]?.usage;
      }
    });
    const data = {
      email: lowerCase(email),
      userId: userId,
      [startTimeKey]: {timeStamp: startTimeKey, usage: previousUsage + usage},
    };
    await firestore()
      .collection('/appUsage/')
      .doc(userId)
      .set(data, {merge: true});
  } catch (error) {
    console.log('@@@ error in writing app usage time', error);
  }
};

export const getAppUsageStats = async email => {
  let appUsageDocs = await firestore()
    .collection('appUsage')
    .where('email', '==', lowerCase(email))
    .get();
  const appUsage = [];
  appUsageDocs?.forEach(function (doc) {
    appUsage.push({...doc.data(), id: doc.id});
  });
  return appUsage;
};

export const getVideoSentiments = async email => {
  let videoSentimentsDocs = await firestore().collection('sentiments').get();
  const videoSentiments = [];
  videoSentimentsDocs?.forEach(function (doc) {
    const docData = doc.data()[lowerCase(email)];
    if (docData) {
      videoSentiments.push({...docData});
    }
  });
  return videoSentiments;
};
