import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import * as userActions from '../../actions/users';
import * as ticketListingsActions from '../../actions/ticketListings';

import FrontHeader from './header/FrontHeader';
import FrontFooter from './FrontFooter';
import FrontRouter from '../../routers/FrontRouter';
import NoDataConnection from './NoDataConnection';

const cookies = new Cookies();

class Front extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  componentWillMount(){
    const selectedTeam = cookies.get('selectedTeam');
    const selectedTicket = cookies.get('selectedTicket');
    const selectedAmount = cookies.get('selectedAmount');
    if(selectedTicket && selectedTeam) {
      this.props.ticketListingsActions.loadTicketListingIntoCart(selectedTeam, selectedTicket);
    }
  }

  logoutUser(){
    this.props.userActions.logoutUser();
    this.props.history.push('/');
  }

  render() {
    if(this.props.loading.user){
      return(
        <div />
      );
    }
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
    userActions: bindActionCreators(userActions, dispatch),
    ticketListingsActions: bindActionCreators(ticketListingsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Front);
