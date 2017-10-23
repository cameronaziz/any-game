import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';

import SelectFilter from '../../common/SelectFilter';

import SeatingChartStyle from './SeatingChartStyle';

import Map from './Map/Map';
import Sections from './Sections/Sections';
import Zones from './Zones/Zones';

class SeatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSections: []
    };
    this.saveSection = this.saveSection.bind(this);
    this.bulkSaveSections = this.bulkSaveSections.bind(this);
    this.saveZone = this.saveZone.bind(this);
  }

  saveZone(zoneData){
    this.props.seatingChartActions.saveZone(this.props.team.key, zoneData);
  }

  saveSection(sectionData){
    this.props.seatingChartActions.saveSection(this.props.team.key, sectionData);
  }

  bulkSaveSections(sectionArray){
    this.props.seatingChartActions.bulkSaveSections(this.props.team.key, eval(sectionArray));
  }

  render() {
    return (
      <div>
        <h1>Lakers</h1>
        <div className="row">
          <div className="col-md-6" style={SeatingChartStyle.mappingContainer}>
            <Map seatingChart={this.props.seatingChart}
                 team={this.props.team} />
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
