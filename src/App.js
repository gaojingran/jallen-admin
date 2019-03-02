

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '$C/RouteWithSubRoutes';
import routerConfig from './router';

export default () => (
  <BrowserRouter>
    <Switch>
      {
        routerConfig.map(route => <RouteWithSubRoutes key={route.path} {...route} />)
      }
    </Switch>
  </BrowserRouter>
);
