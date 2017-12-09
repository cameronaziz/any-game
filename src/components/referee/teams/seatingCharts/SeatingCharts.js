import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';
import { findByKey } from '../../../../lib/utilities';

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
  key: '',
  fileName: '',
  seatingChartUrl: ''
};

class SeatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: teamObj,
      seatingChart: {},
      seatingChartUrl: '',
      modalTitle: 'Seating Chart',
      selectedSections: []
    };
    this.setTeam = this.setTeam.bind(this);
    this.renderConsole = this.renderConsole.bind(this);
    this.renderDropDown = this.renderDropDown.bind(this);
  }

  componentWillMount() {
    this.props.teamActions.loadTeams();
  }

  setTeam(event) {
    let selectedTeam = findByKey(this.props.teams, event.target.value);
    this.setState({
      team: selectedTeam
    });
    this.props.seatingChartActions.getSeatingChart(selectedTeam);
  }

  renderConsole(){
    if(this.props.seatingChart.seatingChartUrl) {
      return(
        <div>
          <SeatingChartConsole team={this.state.team} />
        </div>
      );
    }
    return (
      <div>
        <h3>No Seating Chart Loaded.</h3>
      </div>
    );
  }

  renderDropDown(){
    if(Object.keys(this.props.teams).length > 0) {
      return(
        <SelectItem name="team"
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
