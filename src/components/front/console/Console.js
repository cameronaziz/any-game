import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../actions/teams';
import * as gameActions from '../../../actions/games';
import * as ticketActions from '../../../actions/tickets';
import * as seatingChartActions from '../../../actions/seatingCharts';
import * as seatingChartSectionsActions from '../../../actions/seatingChartSections';

import SeatingChart from '../../common/SeatingChart/SeatingChart';
import TicketList from '../../common/Tickets/TicketList';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSections: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.teamActions.loadTeams();
  }

  componentDidMount() {
    let slug = this.props.location.pathname.split('/')[2];
    let currentTeam = {};
    Object.entries(this.props.teams).forEach(function(team) {
      if(team[1].slug == slug) {
        currentTeam = team;
      }
    });
    this.props.seatingChartActions.getSeatingChartConfigurationBySlug(currentTeam[1].slug);
    this.props.seatingChartSectionsActions.getSections(currentTeam[0]);
    this.props.ticketActions.getTicketsByTeamKey(currentTeam[0]);
    this.props.gameActions.getGamesByTeamKey(currentTeam[0]);
  }

  handleClick(data) {
    let selectedSections = this.state.selectedSections;
    let index = selectedSections.indexOf(data[0]);
    if( index === -1) {
      selectedSections.push(data[0]);
    } else {
      selectedSections.splice(index, 1);
    }
    this.setState({
      selectedSections: selectedSections
    });
    this.props.ticketActions.getTicketsByArrayOfKeys(this.props.tickets, this.state.selectedSections);
  }

  render() {
    return (
      <div>
        <h1 id="teamName">Los Angeles Lakers</h1>
        <div className="row">
          <div className="col-md-6">
            <SeatingChart handleClick={this.handleClick}
                          selectedSections={this.state.selectedSections}
                          seatingChart={this.props.seatingChart}
                          sections={this.props.seatingChartSections}
                          team={this.props.team} />
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="tickets">
              <TicketList tickets={this.props.tickets}
                          sections={this.props.seatingChartSections}
                          games={this.props.games}/>
            </div>
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
    games: state.games
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch),
    seatingChartSectionsActions: bindActionCreators(seatingChartSectionsActions, dispatch),
    ticketActions: bindActionCreators(ticketActions, dispatch),
    gameActions: bindActionCreators(gameActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Console);
