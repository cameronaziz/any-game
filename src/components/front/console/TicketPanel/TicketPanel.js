import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cookies from 'universal-cookie';

import * as ticketListingsActions from '../../../../actions/ticketListings';
import * as settingsActions from '../../../../actions/settings';

import TicketList from './TicketList';
import TicketModal from './TicketModal';

class TicketPanel extends Component {
  constructor(props) {
    super(props);
    this.clearSearchButton = this.clearSearchButton.bind(this);
    this.buyButtonClick = this.buyButtonClick.bind(this);
  }

  clearSearchButton() {
    if(this.props.seatingChartSelections.length > 0) {
      return (
        <div className="clear-search">
          <button className="btn btn-secondary float-right" onClick={this.props.clearSearch}>Clear Search</button>
        </div>
      );
    }
  }

  buyButtonClick(ticketKey, amount) {
    const cookies = new Cookies();
    cookies.set('selectedTicket', ticketKey, { path: '/' });
    cookies.set('selectedAmount', amount, { path: '/' });
    cookies.set('selectedTeam', Object.keys(this.props.team)[0], { path: '/' });
    cookies.set('redirect', 'buyTicket', { path: '/' });
    this.props.ticketListingsActions.loadTicketListingIntoCart(Object.keys(this.props.team)[0], ticketKey);
    this.props.history.push('/purchase');
  }

  render() {
    return (
      <div className="console-right">
        {/* <TicketModal /> */}
        <div className="row">
          <div className="add-ticket">
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#modal" >Add Ticket</button>
          </div>
          &nbsp;
          {this.clearSearchButton()}
        </div>
        <div className="tickets">
          <TicketList buyButtonClick={this.buyButtonClick}/>
        </div>
      </div>
  );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    seatingChartSelections: state.seatingChartSelections,
    team: state.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketListingsActions: bindActionCreators(ticketListingsActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketPanel);
