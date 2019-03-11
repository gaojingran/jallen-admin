

import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import RouteWithSubRoutes from '$C/RouteWithSubRoutes';
import store from './models';
import routerConfig from './router';

export default () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        {
          routerConfig.map(route => <RouteWithSubRoutes key={route.path} {...route} />)
        }
      </Switch>
    </Provider>
  </BrowserRouter>
);
