import React from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SubscribeToCollection = path => WrappedComponent => {
  class HOC extends React.Component {
    state = {
      data: [],
    };

    componentDidMount = async () => {
      this.setupListener();
    };

    componentWillUnmount = async () => {
      this.unsubscribe();
    };

    setupListener = async () => {
      let currUser = auth().currentUser;
      await firestore()
        .collection('users')
        .where('email', '==', currUser.email)
        .get()
        .then(async data => {
          // current user exists
          let user = '';
          data.forEach(function (doc) {
            currUser = doc.data();
          });
        });
      let leftOperand = currUser.physio ? 'physioEmail' : 'patientEmail';
      firestore()
        .collection(path)
        .where(leftOperand, '==', currUser.email)
        .onSnapshot(querySnapshot => {
          let data = [];

          querySnapshot.forEach(doc => {
            let docData = doc.data();
            docData['id'] = doc.id;
            data.push(docData);
          });
          this.setState({data: data});
        });
    };

    unsubscribe() {
      let unsub = firestore()
        .collection(path)
        .onSnapshot(() => {});
      unsub();
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  }

  return HOC;
};

export default SubscribeToCollection;
