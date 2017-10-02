import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';

import List from '../../common/List';
import Modal from '../../common/Modal';
import SelectFilter from '../../common/SelectFilter';

import Map from './Map';
import SeatingChartStyle from './SeatingChartStyle';

import SectionList from './SectionList';

const teamObj = {
  name: '',
  location: '',
  city: '',
  sport: '',
  slug: '',
  venue: '',
  fileName: 'no seatingChart',
  seatingChart: {},
  seatingChartUrl: 'https://firebasestorage.googleapis.com/v0/b/anygame-f7326.appspot.com/o/seatingCharts%2Fmissing.png?alt=media&token=a35c4150-6c32-4600-b6ed-b63ba15ebd8a'
};

class SeatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: teamObj,
      modalTitle: 'Seating Chart',
      sectionOver: 'All',
      selectedSections: [102]
    };
    this.updateFormState = this.updateFormState.bind(this);
    this.setTeam = this.setTeam.bind(this);
    this.onMouseOverSection = this.onMouseOverSection.bind(this);
    this.saveSection = this.saveSection.bind(this);
  }

  componentWillMount() {
    this.props.teamActions.loadTeams();
  }

  updateFormState(event) {
    const field = event.target.name;
    let team = this.state.team;
    team[field] = event.target.value;
    this.setState({team: team});
  }

  setTeam(event) {
    let team = this.props.teams.find((team) => { return team.slug == event.target.value;});
    team = Object.assign({}, teamObj, team);
    this.props.seatingChartActions.getSeatingChartConfiguration(team);
    this.setState({
      team: team
    });
  }

  sectionList(){
    if(this.state.team.fileName != 'no seatingChart') {
      if(this.props.seatingChart.sections) {
        return <SectionList team={this.state.team} sections={this.props.seatingChart.sections} selectedsection={this.state.sectionOver} saveSection={this.saveSection}/>;
      }
    }
  }

  saveSection(sectionData){
    this.props.seatingChartActions.saveSeatingChartConfiguration(this.state.team.key, sectionData);
  }

  mapping(){
    if(this.props.seatingChart.sections){
      return (
        <Map image={this.state.team.seatingChartUrl} sections={this.props.seatingChart.sections} size={this.props.seatingChart.size} highlight={this.onMouseOverSection} />
      );
    } else {
      return (
        <div> </div>
      );
    }
  }

  onMouseOverSection(section) {
    let currentSelections = this.state.selectedSections;
    section = parseInt(section);
    let sectionIndex = currentSelections.findIndex(k => k==section);
    console.log(sectionIndex)
    if(sectionIndex){
      currentSelections = currentSelections.splice(sectionIndex, 1);
    } else {
      currentSelections = currentSelections.push(section);
    }
    this.setState({
      selectedSections: currentSelections
    });
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
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6" style={SeatingChartStyle.seatingChartImageContainer}>
              {this.mapping()}
            </div>
            <div className="col-md-4 offset-md-1 align-top" style={SeatingChartStyle.sectionBuilder}>
              {this.sectionList()}
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
