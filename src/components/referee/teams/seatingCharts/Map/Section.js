import React, {Component} from 'react';

import MapStyle from './MapStyle';

class Section extends Component {

  constructor(props){
    super(props);
    this.state= {
      hover: false,
      fill: "#cce6ff",
      stroke: "#4d4dff"
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(){
    if(this.props.active) {
      this.setState({
        fill: "#1aa3ff"
      });
    }
  }

  onMouseOver(){
    this.setState({
      fill: "#1aa3ff",
      stroke: "#4d4dff"
    });
  }

  onMouseOut(){
    if(!this.props.active){
      this.setState({
        fill: "#cce6ff",
        stroke: "#4d4dff"
      });
    }
  }

  onClick(event){
    event.preventDefault();
    event.stopPropagation();
    this.props.handleClick();
  }

  render(){
    return (
      <a onClick={this.onClick} onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver}>
        <polygon style={MapStyle.polygon} fill={this.state.fill} stroke={this.state.stroke} points={this.props.section.points}/>
      </a>
    );
  }
}

export default Section;
