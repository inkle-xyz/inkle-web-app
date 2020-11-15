import React from 'react';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';

type Route = {
  path: string;
  component: React.FC;
};

const Routes: Route[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/auth',
    component: AuthPage,
  },
];

export default Routes;
