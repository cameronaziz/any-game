import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Administration</h1>
        <a href="/sandbox">Sandbox Page</a>

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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
