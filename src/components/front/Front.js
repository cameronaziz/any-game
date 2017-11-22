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
    this.renderRouter = this.renderRouter.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount(){
    this.props.userActions.getLoggedInUser();
  }

  logoutUser(){
    this.props.userActions.logoutUser();
  }

  renderRouter(){
    if(!this.props.loading.teams) {
      if(Object.keys(this.props.teams).length > 0) {
        return(<FrontRouter teams={this.props.teams} />);
      }
      if(Object.keys(this.props.teams).length == 0) {
        return(<NoDataConnection />);
      }
    }
  }

  render() {
    return (
      <div>
        <FrontHeader logout={this.logoutUser} user={this.props.user}/>
        {this.renderRouter()}
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
