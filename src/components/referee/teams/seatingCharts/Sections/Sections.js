import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import SectionList from './SectionList';
import SectionForm from './SectionForm';
import BulkUploadForm from './BulkUploadForm';
import SectionItem from './SectionItem';

const sectionObj = {
    name: 'Add Section',
    points: '',
    zone: ''
  };

class Sections extends Component {
  constructor(props) {
    super(props);
    this.renderSectionList = this.renderSectionList.bind(this);
  }

  renderSectionList(){
    if(this.props.sections.length > 0){
      return (
            <SectionList saveSection={this.props.saveSection}
                         sections={this.props.sections}
                         selectSelect={this.props.selectSection}
                         clickSection={this.props.clickSection}/>
      );
    }
  }

  render() {
    return (
      <div>
        <br />
        <h3>Sections</h3>
        <div className="col-md-12">
          <div id="accordion" role="tablist" aria-multiselectable="true">
            <div key="newSection">
              <SectionItem labelColor="text-success"
                           saveSection={this.props.saveSection}
                           clickSection={this.props.clickSection}
                           section={sectionObj} />
            </div>
          </div>
          {this.renderSectionList()}
          <br />
          <BulkUploadForm bulkSaveSections={this.props.bulkSaveSections} />
        </div>
      </div>
    );
  }
}

export default Sections;
