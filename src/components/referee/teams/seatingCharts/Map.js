import React, {Component} from 'react';

import SeatingChartStyle from './SeatingChartStyle';

class Map extends Component {

  constructor(props) {
    super(props);
    this.returnArea = this.returnArea.bind(this);
    this.sectionHighlighted = this.sectionHighlighted.bind(this);
  }

  sectionHighlighted(event){
    this.props.highlight(event.target.title);
  }

  returnArea(section){
    return(
      <a xmlns="http://www.w3.org/2000/svg" href="#">
        <polygon key={section} points="967,1167 1070,1167 1070,1309 967,1309" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"/>
      </a>
    );
  }

  render(){
    return (
      <svg>
        <img className="img-fluid mapper" id="seatingChart" width="100%" src={this.props.image} />
        {this.props.sections.map(this.returnArea)}
      </svg>
    );
  }
}

export default Map;
