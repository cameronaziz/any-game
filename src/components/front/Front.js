import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/users';


import FrontHeader from './header/FrontHeader';
import FrontFooter from './FrontFooter';
import FrontRouter from '../../routers/FrontRouter';
import NoDataConnection from './NoDataConnection';

class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount(){
    this.props.userActions.getLoggedInUser();
  }

  logoutUser(){
    this.props.userActions.logoutUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <FrontHeader logout={this.logoutUser} user={this.props.user}/>
        <FrontRouter />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams,
    loading: state.loading,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Front);
