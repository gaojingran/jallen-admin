
import React from 'react';
import Loadable from 'react-loadable';
import Frame from './pages/frame';

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
  },
  {
    path: '/',
    name: 'layout',
    component: Frame,
    routes: [
      {
        path: '/user-list',
        name: '用户列表',
        icon: 'androidperson',
        component: () => <div>用户列表</div>
      },
      {
        path: '/article-list',
        name: '文章列表',
        icon: 'iospaperoutline',
        component: () => <div>文章列表</div>
      },
      {
        path: '/article-edit',
        name: '写文章',
        icon: 'compose',
        component: () => <div>写文章</div>
      },
    ]
  }
];
