import React, {Component} from 'react';

import MapStyle from './MapStyle';

class Section extends Component {

  constructor(props){
    super(props);
    this.state= {
      hover: this.props.active
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseOver(){
    this.setState({
      hover: true
    });
  }

  onMouseOut(){
    this.setState({
      hover: false
    });
  }

  onClick(event){
    event.preventDefault();
    event.stopPropagation();
  }

  render(){
    return (
      <a onClick={this.onClick} onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver}>
        <polygon style={this.state.hover ? MapStyle.hover : MapStyle.noHover} points={this.props.section.points}/>
      </a>
    );
  }
}

export default Section;
