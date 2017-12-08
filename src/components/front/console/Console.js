import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../actions/teams';
import * as ticketListingsActions from '../../../actions/ticketListings';
import * as seatingChartActions from '../../../actions/seatingCharts';
import * as seatingChartSelectionsActions from '../../../actions/seatingChartSelections';

import SeatingChart from './SeatingChart/SeatingChart';
import TicketPanel from './TicketPanel/TicketPanel';

class Console extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.cartReminder = this.cartReminder.bind(this);
  }

  componentDidMount() {
    let slug = this.props.location.pathname.split('/')[2];
    this.props.teamActions.getTeamBySlug(slug);
    this.props.seatingChartActions.getSeatingChartConfigurationBySlug(slug);
    this.props.ticketListingsActions.getTicketListingsBySlug(slug);
  }

  handleClick(data) {
    if(this.props.seatingChartSelections.length == 0) {
      this.props.ticketListingsActions.newFilterTicketsBySection(data[0]);
    } else {
      this.props.ticketListingsActions.filterTicketsBySections(this.props.seatingChartSelections, data[0]);
    }
    this.props.seatingChartSelectionsActions.clickSection(data[0]);
  }

  clearSearch() {
    //todo: fix
    this.props.ticketListingsActions.clearTicketListingsFilter();
    this.props.seatingChartSelectionsActions.clearSelections();
  }

  cartReminder() {
    if(typeof this.props.cart.selectedTicket != "undefined") {
      return (
        <div className="col-md-6 offset-md-3">
          <div className="alert alert-warning" role="alert">
            You have tickets in your cart. <strong>Buy Now</strong>
          </div>
        </div>
      );
    }
    return <div/>;
  }

  render() {
    let teamKey = Object.keys(this.props.teams)[0];
    //let teamName = this.props.teams[teamKey].location + " " + this.props.teams[teamKey].name;
    let teamName = 'Test';
    return (
      <div>
        {this.cartReminder()}
        <h1 id="teamName">{teamName}</h1>
        <div className="row">
          <div className="col-md-6">
            <SeatingChart handleClick={this.handleClick}
                          selectedSections={this.props.seatingChartSelections}
                          team={this.props.teams.teamKey} />
          </div>
          <div className="col-md-5 offset-md-1">
            <TicketPanel saveButton={this.clearSearch}
                         clearSearch={this.clearSearch}
                         history={this.props.history} />

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams,
    seatingChart: state.seatingChart,
    seatingChartSections: state.seatingChartSections,
    ticketListingns: state.tickets,
    settings: state.settings,
    games: state.games,
    seatingChartSelections: state.seatingChartSelections,
    loading: state.loading,
    cart: state.cart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    ticketListingsActions: bindActionCreators(ticketListingsActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch),
    seatingChartSelectionsActions: bindActionCreators(seatingChartSelectionsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Console);
