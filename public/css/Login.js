import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authenticationActions from '../../actions/authentication';
import LoginForm from './LoginForm';

class Login extends Component {
    render(){
      return(
        <LoginForm />
      )
    }
}


function mapStateToProps(state, ownProps) {
    return {
      authentication: state.authentication
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      authenticationActions: bindActionCreators(authenticationActions, dispatch)
    };
  }


  export default connect(mapStateToProps, mapDispatchToProps)(Login);
