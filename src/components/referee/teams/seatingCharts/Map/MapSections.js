import React, {Component} from 'react';

import Section from './Section';

import MapStyle from './MapStyle';

class MapSvg extends Component {
  constructor(props) {
    super(props);
    this.renderSection = this.renderSection.bind(this);
  }

  renderSection(item, index){
    const handleClick = () => this.props.setItem(item);
    const active = true;
    return (
      <Section key={index}
               handleClick={handleClick}
               section={item}
               active={active} />
    );
  }

  sectionListMap() {
    if(this.props.sections) {
      let sections = Object.values(this.props.sections);
      return (
        sections.map(this.renderSection)
      );
    }
  }

  render(){
    return (
      <div style={MapStyle.seatingChartImageContainer}>
        <svg version="1.1" id="svg3699" width="100%" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
          <image xlinkHref={this.props.image}  x="0" y="0" />
          {this.sectionListMap()}
        </svg>
      </div>
    );
  }
}

export default MapSvg;
