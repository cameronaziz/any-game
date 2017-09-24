import React from 'react';
import { Route } from 'react-router-dom';

import Teams from '../components/referee/teams/Teams';
import SeatingCharts from '../components/referee/teams/seatingCharts/SeatingCharts';
import Sports from '../components/referee/sports/Sports';
import Users from '../components/referee/users/Users';
import LoadGames from '../components/referee/games/LoadGames';
import Games from '../components/referee/games/Games';
import LoadTickets from '../components/referee/tickets/LoadTickets';
import Tickets from '../components/referee/tickets/Tickets';
import Venues from '../components/referee/venues/Venues';


const RefereeRouter = (props) => {
  return(
      <main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <Route path="/referee/sports" component={Sports} />
        <Route path="/referee/teams/seating-charts" component={SeatingCharts} />
        <Route path="/referee/teams" exact component={Teams} />
        <Route path="/referee/users" component={Users} />
        <Route path="/referee/load-games" component={LoadGames} settings={props.settings} />
        <Route path="/referee/games" component={Games} settings={props.settings} />
        <Route path="/referee/load-tickets" component={LoadTickets} settings={props.settings} />
        <Route path="/referee/tickets" component={Tickets} />
        <Route path="/referee/venues" component={Venues} />
      </main>
  );
};

export default RefereeRouter;
