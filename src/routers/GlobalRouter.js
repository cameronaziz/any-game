import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Front from '../components/front/Front';
import RefereeConsole from '../components/referee/RefereeConsole';
import Sandbox from '../components/sandbox';



const GlobalRouter = () => {
  return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/referee" component={RefereeConsole}/>
            <Route path="/sandbox" component={Sandbox}/>
            <Route path="/" component={Front} />
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default GlobalRouter;
