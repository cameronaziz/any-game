import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import SectionItem from './SectionItem';

const sectionObj = {
    name: 'Add Section',
    points: '',
    zone: ''
  };

class SectionList extends Component {
  constructor(props) {
    super(props);
    this.previewSection = this.previewSection.bind(this);
  }

  previewSection(item, index){
    return (
      <div key={item.name}>
        <SectionItem index={index}
                     clickSection={this.props.clickSection}
                     saveSection={this.props.saveSection}
                     section={item} />
      </div>
    );
  }

  render() {
    return (
      this.props.sections.map(this.previewSection)
    );
  }
}


export default SectionList;
