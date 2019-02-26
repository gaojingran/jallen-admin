
import React from 'react';
import Loadable from 'react-loadable';
import User from '$P/user';

const Loading = () => <div>loading...</div>;

const Login = Loadable({
  loader: () => import('$P/user/login'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('$P/user/register'),
  loading: Loading,
});

export default [
  {
    path: '/user',
    name: '',
    component: User,
    routes: [
      {
        path: '/user/login',
        name: '登录',
        component: Login,
      },
      {
        path: '/user/register',
        name: '注册',
        component: Register,
      },
    ],
  }
];
