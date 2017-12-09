
import React, {Component} from 'react';

import Section from './Section';

import MapStyle from './MapStyle';

class Map extends Component {
  constructor(props) {
    super(props);
    this.renderSection = this.renderSection.bind(this);
  }

  renderSection(item){
    const handleClick = () => this.props.handleClick(item);
    let active = true;
    if(this.props.selectedSections.indexOf(item[0]) === -1) {
      active = false;
    }
    return (
      <Section section={item[1]}
               active={active}
               key={item[0]}
               index={item[0]}
               handleClick={handleClick} />
    );
  }

  sectionListMap() {
    if(this.props.sections) {
      let sections = Object.entries(this.props.sections);
      return (
        sections.map(this.renderSection)
      );
    }
  }

  render(){
    return (
      <div>
        <svg version="1.1" id="svg3699" width="100%" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
          <image xlinkHref={this.props.seatingChart.seatingChartUrl}  x="0" y="0" />
          {this.sectionListMap()}
        </svg>
      </div>
    );
  }
}

export default Map;
