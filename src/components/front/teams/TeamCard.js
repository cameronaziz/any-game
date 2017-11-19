import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

let cardStyle = {
  width: '20rem'
};

class TeamCard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="card" style={cardStyle}>
        <img className="card-img-top" src="..." alt="Card image cap" />
        <div className="card-block">
          <h4 className="card-title">{this.props.team[1].name}</h4>
          <p className="card-text">The {this.props.team[1].location} {this.props.team[1].name} play {this.props.team[1].sport} at {this.props.team[1].venue}.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
  );
  }
}


export default TeamCard;
