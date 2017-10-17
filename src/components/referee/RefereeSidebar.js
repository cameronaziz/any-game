import React, { Component} from 'react';

import navLink from '../common/navLink';

class RefereeSidebar extends Component {
  render() {
    return(
      <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/sports', 'Sports')}
        </ul>
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/venues', 'Venues')}
        </ul>
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/teams', 'Teams')}
<<<<<<< HEAD
          {navLink('/referee/teams/seating-charts', 'Seating Charts')}
=======
          {navLink('/referee/teams/seating-chart', 'Seating Chart')}

>>>>>>> master
        </ul>
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/load-games', 'Load Games')}
          {navLink('/referee/games', 'Games')}
        </ul>
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/load-tickets', 'Load Tickets')}
          {navLink('/referee/tickets', 'Tickets')}
        </ul>
        <ul className="nav nav-pills flex-column">
          {navLink('/referee/users', 'Users')}
        </ul>
      </nav>
    );
  }
}
export default RefereeSidebar;
