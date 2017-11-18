import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TeamCard from './TeamCard';

let cardStyle = {
  width: '20rem'
};

class Teams extends Component {
  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this);
    this.renderCardList = this.renderCardList.bind(this);
  }

  renderCard(team, index){
    if(index % 3 == 0) {
      return (
        <TeamCard team={team} key={team[0]} index={index} />
      )
    }

    if(index % 3 == 1) {
      return <TeamCard team={team} key={team[0]} index={index} />;
    }

    if(index % 3 == 2) {
      return <TeamCard team={team} key={team[0]} index={index} />;
    }
  }

  renderCardList(){
    let teams = Object.entries(this.props.teams);
    return teams.map(this.renderCard);
  }

  render() {
    return (
      <div>
        <h1>The Teams</h1>
        {this.renderCardList()}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Teams);
