import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Error404 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header-featured">
         <div id="banner-wrapper">
            <div id="banner" className="container">
              <h1>Page Not Found</h1>
              <p>We are sorry. The page you requested can not be found.</p><br/>
              <a href="/">Go to homepage</a>
            </div>
         </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Error404);
