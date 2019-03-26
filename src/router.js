
import React from 'react';
import Loadable from 'react-loadable';
import Frame from './pages/frame';

const Loading = () => null;

const Login = Loadable({
  loader: () => import('$P/login'),
  loading: Loading,
});

const AccountSetting = Loadable({
  loader: () => import('$P/account-setting'),
  loading: Loading,
});

const UserList = Loadable({
  loader: () => import('$P/user-list'),
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
        path: '/account-setting',
        name: '账号设置',
        notInNav: true,          // 不在菜单按钮上显示
        component: AccountSetting,
      },
      {
        path: '/user-list',
        name: '用户列表',
        icon: 'androidperson',
        component: UserList,
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
