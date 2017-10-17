import React, { Component } from 'react';

import SeatingChartStyle from './../SeatingChartStyle';
import SectionList from './SectionList';
import SectionForm from './SectionForm';
import BulkUploadForm from './BulkUploadForm';

class Sections extends Component {
  constructor(props) {
    super(props);
    this.renderSectionList = this.renderSectionList.bind(this);
  }

  renderSectionList(){
    if(this.props.seatingChart.teamName){
      return (
        <div>
          <br />
          <h3>Sections</h3>
          <div className="col-md-12">
            <SectionList saveSection={this.props.saveSection}
                         seatingChart={this.props.seatingChart}
                         selectSelect={this.props.selectSection} />
            <br />
            <BulkUploadForm bulkSaveSections={this.props.bulkSaveSections} />
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderSectionList()}
      </div>
    );
  }
}

export default Sections;
