import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import * as ticketLisingsActions from '../../actions/ticketListings';
import moment from 'moment';

const cookies = new Cookies();

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.clearCookies = this.clearCookies.bind(this);
  }

  componentWillMount() {
    let now = moment().utcOffset(-8).format();
    console.log(now);
  }

  clearCookies(){
    cookies.remove('selectedTicket');
    cookies.remove('selectedTeam');
    cookies.remove('selectedAmount');
  }

  render() {
    return(
      <div><h1>Cookies</h1>
        {JSON.stringify(cookies.getAll())}
        <br/>
        <button type="button" className="btn btn-warning" onClick={this.clearCookies}>Clear Ticket Cookies</button>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    ticketListings: state.ticketListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketLisingsActions: bindActionCreators(ticketLisingsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Sandbox);
