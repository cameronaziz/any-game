import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';

import List from '../../common/List';
import Modal from '../../common/Modal';
import SelectFilter from '../../common/SelectFilter';

import Map from './Map/Map';
import SeatingChartStyle from './SeatingChartStyle';

import Sections from './Sections/Sections';
import Zones from './Zones/Zones';

const teamObj = {
  name: '',
  location: '',
  city: '',
  sport: '',
  slug: '',
  venue: '',
  fileName: 'no seatingChart',
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
    this.saveSection = this.saveSection.bind(this);
    this.bulkSaveSections = this.bulkSaveSections.bind(this);
    this.renderConsole = this.renderConsole.bind(this);
    this.saveZone = this.saveZone.bind(this);
  }

  componentWillMount() {
    this.props.teamActions.loadTeams();
  }

  setTeam(event) {
    let team = this.props.teams.find((team) => { return team.slug == event.target.value;});
    this.props.seatingChartActions.getSeatingChartConfiguration(team.key);
    this.setState({
      team: team
    });
  }

  saveZone(zoneData){
    this.props.seatingChartActions.saveZone(this.state.team.key, zoneData);
  }

  selectSection(sectionName){
    sectionName
  }

  saveSection(sectionData, index){
    this.props.seatingChartActions.saveSection(this.state.team.key, sectionData);
  }

  bulkSaveSections(sectionArray){
    this.props.seatingChartActions.bulkSaveSections(this.state.team.key, eval(sectionArray));
  }

  renderConsole(){
    if(this.props.seatingChart) {
      if(this.props.seatingChart.teamName) {
        return(
          <div>
            <div className="row">
              <div className="col-md-6" style={SeatingChartStyle.mappingContainer}>
                <Map seatingChart={this.props.seatingChart}
                     image={this.state.team.seatingChartUrl} />
                <Zones teamName={this.props.seatingChart.teamName}
                       zones={this.props.seatingChart.zones}
                       saveZone={this.saveZone} />
              </div>
              <div className="col-md-4 offset-md-1 align-top" style={SeatingChartStyle.sectionBuilder}>
                <Sections seatingChart={this.props.seatingChart}
                          saveSection={this.saveSection}
                          bulkSaveSections={this.bulkSaveSections} />
              </div>
            </div>
            <div style={SeatingChartStyle.consoleFooter}/>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Seating Chart Admin</h1>
        <div className="row">
          <div className="col-md-3">
            <SelectFilter name="team"
                          value={this.state.team}
                          getData={this.setTeam}
                          items={this.props.teams} />
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
