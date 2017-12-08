import React, { Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ticketLisingsActions from '../../actions/ticketListings';


const TevoClient = require('ticketevolution-node');
const API_TOKEN = '3a0b45f492f1b91c11d195d87a7070dc';
const API_SECRET_KEY = 'CKOSFUQg6uPx0XDa63/QKhb9z+rj7WuVQoNR92mD';
const SIGNATURE = 'HZYYtggErHc7zMKqWMfn7M6MPlY8xFvP9qPo+VvqIRs=';

const tevoClient = new TevoClient({
  apiToken:     API_TOKEN,
  apiSecretKey: API_SECRET_KEY,
});


class Sandbox extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const signature = TevoClient.makeSignatureFromParts({
  hostname: 'api.ticketevolution.com',
  method: 'GET',
  path: '/v9/orders',
  querystring: 'per_page=100&updated_at.gte=2015-08-21T01%3A44%3A18Z',
  secret: 'CKOSFUQg6uPx0XDa63/QKhb9z+rj7WuVQoNR92mD'
});
console.log(signature)


tevoClient.getJSON('https://api.sandbox.ticketevolution.com/v9/events').then((json) => {
    console.log('Got events from API.', json.total_entries, json.events);
}).catch((err) => {
    console.log(err);
});


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
