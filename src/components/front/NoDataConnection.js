import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as teamActions from '../../actions/teams';
import * as seatingChartActions from '../../actions/seatingCharts';


class NoDataConnection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
               <p>We are sorry, we can not load the <strong>Any Game</strong> application at this time.</p>
               
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


export default connect(mapStateToProps, mapDispatchToProps)(NoDataConnection);
