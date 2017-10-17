import React, {Component} from 'react';

import Section from './Section';

import MapStyle from './MapStyle';
import MapSvg from './MapSvg';

class Map extends Component {

  constructor(props) {
    super(props);
    this.renderSvg = this.renderSvg.bind(this);
  }

  renderSvg(){
    if(this.props.image){
      return (
        <MapSvg image={this.props.image}
                seatingChart={this.props.seatingChart} />
      );
    }
  }

  render(){
    return (
      <div>
        {this.renderSvg()}
      </div>
    );
  }
}

export default Map;
