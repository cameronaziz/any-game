import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../actions/teams';
import * as seatingChartActions from '../../actions/seatingCharts';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.onTeamSelect = this.onTeamSelect.bind(this);
  }

  componentWillMount(){
    this.props.teamActions.loadTeams();
  }

  onTeamSelect(event){
    this.props.history.push('/tickets/' + this.props.teams[event.target.value].slug);
  }

  renderOptions(){
    if(Object.keys(this.props.teams).length > 0) {
      let teams = Object.entries(this.props.teams);
      return(
        teams.map((option) => {
          return <option key={option[0]} value={option[0]}>{option[1].name}</option>;
        })
      );
    }
  }

  render() {
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <p>Select any team and our application will find the best tickets for <strong>Any Game</strong>.</p>
               <div className="dropdown">
                 <select name="team"
                         onChange={this.onTeamSelect} >
                   <option value="none">SELECT ANY TEAM</option>
                   {this.renderOptions()}
                 </select>
               </div>
            </div>
         </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    teams: state.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamActions: bindActionCreators(teamActions, dispatch),
    seatingChartActions: bindActionCreators(seatingChartActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
