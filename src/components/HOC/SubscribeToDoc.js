import React from 'react';
import {db} from './../Controllers/Firebase';

const SubscribeToDoc = (path, docID) => (WrappedComponent) => {
  class HOC extends React.Component {
    state = {
      doc: {},
      doc_id: null,
      collectionID: 'exercises',
    };

    componentWillReceiveProps(nextProps) {
      // console.log('Current props: ', this.props);
      // console.log('Next props: ', nextProps);
    }

    componentDidMount = async () => {
      this.setupListener();
      // console.log("HOC state", this.state);
    };

    componentWillUnmount = async () => {
      this.unsubscribe();
    };

    setupListener() {
      let docRef = db.collection(path).doc(docID);
      let observer = docRef.onSnapshot(
        (docSnapshot) => {
          let docData = docSnapshot.data();
          docData['id'] = docSnapshot.id;
          // console.log("docData", docData);
          this.setState({doc: docData});
        },
        (err) => {
          // console.log(`Encountered error: ${err}`);
        },
      );
    }

    unsubscribe() {
      let unsub = db
        .collection(path)
        .doc(id)
        .onSnapshot(() => {});
      unsub();
    }

    render() {
      // console.log("rnder this.props.state", this.props.state);
      return (
        <WrappedComponent
          data={this.state.doc}
          docID={this.state.doc_id}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

export default SubscribeToDoc;
