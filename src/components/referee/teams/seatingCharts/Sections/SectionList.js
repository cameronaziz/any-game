import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import SectionItem from './SectionItem';

const sectionObj = [
  '',
  {
    name: 'Add Section',
    points: '',
    zone: ''
  }
];

class SectionList extends Component {
  constructor(props) {
    super(props);
    this.previewSection = this.previewSection.bind(this);
    this.sectionListMap = this.sectionListMap.bind(this);
  }

  previewSection(item, index){
    return (
      <div key={item[1].name}>
        <SectionItem index={item[0]}
                     clickSection={this.props.clickSection}
                     saveSection={this.props.saveSection}
                     section={item}
                     zones={this.props.seatingChart.zones} />
      </div>
    );
  }

  sectionListMap() {
    if(this.props.sections) {
      let sections = Object.entries(this.props.sections);
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
                       clickSection={this.props.clickSection}
                       section={sectionObj}
                       zones={this.props.seatingChart.zones} />
        </div>
        {this.sectionListMap()}
      </div>
    );
  }
}


export default SectionList;
