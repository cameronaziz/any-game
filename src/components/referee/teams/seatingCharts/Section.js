import React, {Component} from 'react';

import MapStyle from './MapStyle';

class Section extends Component {
  render(){
    return (
      <a href={this.props.section.name}>
        <polygon style={MapStyle.unselected} className={this.props.active ? 'sectionSelected': 'sectionUnselected'} points={this.props.section.points}/>
      </a>
    );
  }
}

export default Section;
