import {db} from '../../../Controllers/Firebase';

export const setVideo = (item, setState) => {
  setState({item});
};

export const updateAnalytics = (id, count) => {
  db.collection('exercises')
    .doc(id)
    .set({viewed: count + 1}, {merge: true});
};

export const _onPlaybackStatusUpdate = (playbackStatus, state) => {
  if (playbackStatus.didJustFinish) {
    let item = state.item;
    db.collection('exercises')
      .doc(item.id)
      .set({viewComplete: item.viewComplete + 1}, {merge: true});
  }
};
