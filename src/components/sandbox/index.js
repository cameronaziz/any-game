import React, { Component} from 'react';
import ticketmaster from 'ticketmaster';

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: {}
    };
  }


  componentWillMount() {
    ticketmaster('pBRT3qDcJwYhtGYE1czLtXodTrXPGutr').discovery.v2.event.find('G5eYZfYSzQZUC')
    .then(function(result) {
      console.log(result);
    });
  }


  render() {
    return(
      <div>Hello</div>
    );
  }
}
export default Sandbox;
