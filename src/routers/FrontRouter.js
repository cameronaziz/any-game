import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from '../components/front/LandingPage';
import TicketConsole from '../components/front/console/Console';
import ContactUs from '../components/front/ContactUs';
import Register from '../components/front/Register';
import Login from '../components/front/Login';
import PurchasePath from '../components/front/purchasePath/PurchasePath';
import Error404 from '../components/front/Error404';

const FrontRouter = (props) => {
  return (
    <div className="container-fluid">
      <div className="col-md-10 offset-md-1">
        <Switch>
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/purchase" component={PurchasePath} />
          <Route path="/tickets/:name" component={TicketConsole} />
          <Route path="/" exact component={LandingPage} />
          <Route path="/" component={Error404} />
        </Switch>
      </div>
    </div>
  );
};

export default FrontRouter;
