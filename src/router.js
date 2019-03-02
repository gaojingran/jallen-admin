
import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => <div>loading...</div>;

const Login = Loadable({
  loader: () => import('$P/login'),
  loading: Loading,
});

export default [
  {
    path: '/login',
    name: '登录',
    component: Login,
  }
];
