import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../actions/teams';
import * as ticketActions from '../../../actions/tickets';
import * as seatingChartActions from '../../../actions/seatingCharts';
import * as seatingChartSelectionsActions from '../../../actions/seatingChartSelections';

import SeatingChart from './SeatingChart/SeatingChart';
import TicketPanel from './TicketPanel/TicketPanel';

class Console extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    let slug = this.props.location.pathname.split('/')[2];
    this.props.teamActions.getTeamBySlug(slug);
    this.props.seatingChartActions.getSeatingChartConfigurationBySlug(slug);
    this.props.ticketActions.getTicketsBySlug(slug);
  }

  handleClick(data) {
    if(this.props.seatingChartSelections.length == 0) {
      this.props.ticketActions.newFilterTicketsBySection(data[0]);
    } else {
      this.props.ticketActions.filterTicketsBySections(this.props.seatingChartSelections, data[0]);
    }
    this.props.seatingChartSelectionsActions.clickSection(data[0]);
  }

  clearSearch() {
    this.props.ticketActions.clearFilterBySection();
    this.props.seatingChartSelectionsActions.clearSelections();
  }

  render() {
    let teamKey = Object.keys(this.props.teams)[0];
    return (
      <div>
        <h1 id="teamName"></h1>
        <div className="row">
          <div className="col-md-6">
            <SeatingChart handleClick={this.handleClick}
                          selectedSections={this.props.seatingChartSelections}
                          team={this.props.teams.teamKey} />
          </div>
          <div className="col-md-5 offset-md-1">
            <TicketPanel saveButton={this.clearSearch}
                         clearSearch={this.clearSearch} />

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
    tickets: state.tickets,
    settings: state.settings,
    games: state.games,
    seatingChartSelections: state.seatingChartSelections,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch),
    seatingChartSelectionsActions: bindActionCreators(seatingChartSelectionsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Console);
