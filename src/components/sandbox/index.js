import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketLisingsActions from '../../actions/ticketListings';
import moment from 'moment';

class Sandbox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let now = moment().utcOffset(-8).format();
    console.log(now);

  }


  render() {
    return(
      <div>Hello</div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    ticketListings: state.ticketListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ticketLisingsActions: bindActionCreators(ticketLisingsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Sandbox);
