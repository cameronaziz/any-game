import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';

import List from '../../common/List';
import Modal from '../../common/Modal';
import SelectItem from '../../common/SelectItem';

import Map from './Map/Map';
import SeatingChartConsole from './SeatingChartConsole';
import SeatingChartStyle from './SeatingChartStyle';

const teamObj = {
  name: '',
  location: '',
  city: '',
  sport: '',
  slug: '',
  key: '-KoU93bkph-iW1-3yo6B',
  fileName: '',
  seatingChart: {},
  seatingChartUrl: ''
};

class SeatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: teamObj,
      seatingChart: {},
      modalTitle: 'Seating Chart',
      selectedSections: []
    };
    this.setTeam = this.setTeam.bind(this);
    this.renderConsole = this.renderConsole.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentWillMount() {
    this.props.teamActions.loadTeams();
    this.props.seatingChartActions.getSeatingChartConfiguration('-KoU93bkph-iW1-3yo6B');
  }

  setTeam(event) {
    let team = this.props.teams.find((team) => { return team.slug == event.target.value;});
    this.props.seatingChartActions.getSeatingChartConfiguration(team.key);
    this.setState({
      team: team
    });
  }

  renderConsole(){
    if(this.state.team.fileName != "no seatingChart") {
      return(
        <div>
          <SeatingChartConsole team={this.state.team} />
        </div>

      );
    }
  }

  renderDropDown(){
    if(Object.keys(this.props.teams).length > 0) {
      return(
        <SelectItem name="team"
                    value={this.state.team}
                    onChange={this.setTeam}
                    items={this.props.teams} />
      );
    }
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            {this.renderDropDown()}
          </div>
        </div>
        <br />
        {this.renderConsole()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams,
    seatingChart: state.seatingChart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SeatingChart);
