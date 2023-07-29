import React, {Component} from 'react';
import GlobalContext from './globalContext';

export default class GlobalProvider extends Component {
  state = {
    user: null,
    authLoading: true,
  };

  updateState = newState => {
    this.setState({...this.state, ...newState});
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          updateState: this.updateState,
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
