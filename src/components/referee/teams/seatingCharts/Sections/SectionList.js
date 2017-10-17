import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import SectionItem from './SectionItem';

const sectionObj = {
  name: '',
  points: ''
};

class SectionList extends Component {
  constructor(props) {
    super(props);
    this.previewSection = this.previewSection.bind(this);
    this.sectionListMap = this.sectionListMap.bind(this);
  }

  previewSection(item, index){
    return (
      <div key={item.name}>
        <SectionItem index={index}
                     saveSection={this.props.saveSection}
                     section={item}
                     zones={this.props.seatingChart.zones}
                     selectSection={this.props.selectSection} />
      </div>
    );
  }

  sectionListMap() {
    if(this.props.seatingChart.sections) {
      let sections = Object.values(this.props.seatingChart.sections);
      return (
        sections.map(this.previewSection)
      );
    }
  }

  render() {
    return (
      <div id="accordion" role="tablist" aria-multiselectable="true">
        <div key="newSection">
          <SectionItem labelColor="text-success"
                       saveSection={this.props.saveSection}
                       section={sectionObj}
                       zones={this.props.seatingChart.zones} />
        </div>
        {this.sectionListMap()}
      </div>
    );
  }
}


export default SectionList;
