import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketActions from '../../../actions/tickets';
import * as teamActions from '../../../actions/teams';

import RefereeLoading from '../RefereeLoading';

class LoadTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: ''
    };
    this.getTickets = this.getTickets.bind(this);
  }

  getTickets(){
  }

  render() {
    return (
      <div>
        <h1>Load Ticket Admin</h1>
        <div className="col-md-3">
          {this.state.error ? <div className="alert alert-warning" role="alert">{this.state.errorMessage}</div> : <div></div>}
          <button type="button" className="btn btn-primary" onClick={this.getTickets}>Load Tickets</button>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    tickets: state.tickets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketActions: bindActionCreators(ticketActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LoadTickets);
