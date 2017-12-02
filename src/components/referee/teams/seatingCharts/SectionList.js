import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as seatingChartActions from '../../../../actions/seatingCharts';

import SeatingChartStyle from './SeatingChartStyle';
import SectionItem from './SectionItem';

class SectionList extends Component {
  constructor(props) {
    super(props);
    this.previewSection = this.previewSection.bind(this);
  }

  previewSection(item, index){
    return (
      <SectionItem key={index} item={item} saveSection={this.props.saveSection}/>
    );
  }

  render() {
    let height = document.getElementById('seatingChart').clientHeight;
    return (
      <div>
        <h3>Sections</h3>
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div className="card">
            <div className="card-header" role="tab" id="headingOne">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Add Section
                </a>
              </h5>
            </div>
            <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne">
              <div className="card-block">
                Form to Add Section
              </div>
            </div>
          </div>
        </div>
        {this.props.sections.map(this.previewSection)}
        {this.props.sections.map(this.previewSection)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    seatingChart: state.seatingChart
  };
}

function mapDispatchToProps(dispatch) {
  return {
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SectionList);
