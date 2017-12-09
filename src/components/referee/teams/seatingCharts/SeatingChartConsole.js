import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../../../actions/teams';
import * as seatingChartActions from '../../../../actions/seatingCharts';
import * as seatingChartSectionsActions from '../../../../actions/seatingChartSections';

import SelectFilter from '../../common/SelectFilter';

import SeatingChartStyle from './SeatingChartStyle';

import Map from './Map/Map';
import Sections from './Sections/Sections';
import Zones from './Zones/Zones';

class SeatingChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSections: [],
      mapStyle: SeatingChartStyle.mappingContainer
    };
    this.saveSection = this.saveSection.bind(this);
    this.bulkSaveSections = this.bulkSaveSections.bind(this);
    this.saveZone = this.saveZone.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderLoaded = this.renderLoaded.bind(this);
  }

  componentWillMount() {
    this.props.seatingChartActions.getSeatingChart(this.props.team.key);
  }

  saveZone(zoneData){
    this.props.seatingChartActions.saveZone(this.props.team.key, zoneData);
  }

  saveSection(sectionData){
    sectionData['seatingChartKey'] = this.props.team;
    this.props.seatingChartSectionsActions.saveSection(sectionData);
  }

  bulkSaveSections(sectionArray){
    this.props.seatingChartActions.bulkSaveSections(this.props.team.key, eval(sectionArray));
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
  }

  renderLoaded(){
    if(!this.props.loading.seatingChart){
      return(
        <div>
          <div style={{position: 'fixed'}} className="col-md-6">
            <h2>{this.props.team.name}</h2>
            <div style={SeatingChartStyle.mappingContainer}>
              <Map handleClick={this.handleClick}
                   selectedSections={this.state.selectedSections}
                   seatingChart={this.props.seatingChart}
                   sections={this.props.seatingChartSections}
                   team={this.props.team} />
            </div>
          </div>
          <div>
            <div className="col-md-4 offset-md-7" style={SeatingChartStyle.sectionBuilder}>
              <Sections sections={this.props.seatingChartSections}
                        saveSection={this.saveSection}
                        bulkSaveSections={this.bulkSaveSections}
                        clickSection={this.handleClick} />


            </div>
          </div>
          <div style={SeatingChartStyle.consoleFooter}/>
        </div>
      );
    }

  }
  render() {
    return (
      <div className="referee-console">
        {this.renderLoaded()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams,
    seatingChart: state.seatingChart,
    seatingChartSections: state.seatingChartSections,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch),
    seatingChartSectionsActions: bindActionCreators(seatingChartSectionsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SeatingChart);
