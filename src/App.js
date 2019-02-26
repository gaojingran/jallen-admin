

import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import RouteWithSubRoutes from '$C/RouteWithSubRoutes';
import routerConfig from './router';

export default () => (
  <BrowserRouter>
    <Switch>
      {
        routerConfig.map(route => <RouteWithSubRoutes key={route.path} {...route} />)
      }
      <Redirect to={routerConfig[0].path} />
    </Switch>
  </BrowserRouter>
);
