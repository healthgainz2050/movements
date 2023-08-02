import {db} from '../../../Controllers/Firebase';

export const setupListener = (doc_id, state, setState) => {
  let docRef = db.collection(state.collectionID).doc(doc_id);
  let observer = docRef.onSnapshot(
    (docSnapshot) => {
      let docData = docSnapshot.data();
      docData['id'] = docSnapshot.id;
      setState({...state, doc: docData, dataLoaded: true});
    },
    (err) => {},
  );
};

export const unsubscribe = (state) => {
  let unsub = db
    .collection(state.collectionID)
    .doc(state.doc_id)
    .onSnapshot(() => {});
  unsub();
};
