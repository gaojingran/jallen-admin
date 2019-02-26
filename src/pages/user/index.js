
import React from 'react';
import RouteWithSubRoutes from '$C/RouteWithSubRoutes';

export default ({ routes }) => {
  return (
    <div className="full bg-dark">
      user
      {
        routes.map(route => <RouteWithSubRoutes key={route.path} {...route} />)
      }
    </div>
  )
}
