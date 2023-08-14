import firestore from '@react-native-firebase/firestore';

export const setupListener = (doc_id, state, setState) => {
  let docRef = firestore().collection(state.collectionID).doc(doc_id);
  let observer = docRef.onSnapshot(
    docSnapshot => {
      let docData = docSnapshot.data();
      docData['id'] = docSnapshot.id;
      setState({...state, doc: docData, dataLoaded: true});
    },
    err => {},
  );
};

export const unsubscribe = state => {
  let unsub = firestore()
    .collection(state.collectionID)
    .doc(state.doc_id)
    .onSnapshot(() => {});
  unsub();
};
