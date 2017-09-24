import React, {Component} from 'react';



class Map extends Component {

  constructor(props) {
    super(props);
    let img = document.getElementById('seatingChart');
    this.state = {
      xFactor: img.clientWidth/this.props.size.width,
      yFactor: img.clientHeight/this.props.size.height
    };
    this.returnArea = this.returnArea.bind(this);
    this.sectionHighlighted = this.sectionHighlighted.bind(this);
  }

  sectionHighlighted(event){
    this.props.highlight(event.target.title);
  }

  returnArea(section){
    let coords = '';
    let area = section.area;
    for(let i = 0; i < area.length; i++) {
      let x = area[i].x * this.state.xFactor;
      coords = coords.concat(x);
      coords = coords.concat(', ');

      let y = area[i].y * this.state.yFactor;
      coords = coords.concat(y);
      coords = coords.concat(', ');
    }
    coords = coords.substring(0, coords.length - 2);
    return(
      <area alt="" key={section.name} style={{display: 'block', border: '5px'}} className="noborder icolor00ff00" title={section.name} href={section.name} shape="poly" coords={coords} onMouseOver={this.sectionHighlighted}/>
    );
  }

  render(){
    return (
      <map name="Map" id="Map">
        {this.props.sections.map(this.returnArea)}
      </map>
    );
  }
}

export default Map;
