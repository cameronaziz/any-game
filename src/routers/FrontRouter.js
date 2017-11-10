import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from '../components/front/LandingPage';
import TicketConsole from '../components/front/console/Console';
import Teams from '../components/front/Teams';
import ContactUs from '../components/front/ContactUs';

const FrontRouter = (props) => {
  return (
    <div className="container-fluid">
      <div className="col-md-10 offset-md-1">
        <Switch>
          <Route path="/teams" component={Teams} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/tickets/:name" component={TicketConsole} />
          <Route path="/" exact component={LandingPage} />
        </Switch>
      </div>
    </div>
  );
};


export default FrontRouter;
