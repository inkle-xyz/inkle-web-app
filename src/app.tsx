import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Routes from './routes/routes';

const App: React.FC = () => (
  <Switch>
    {Routes.map((route) => (
      <Route exact path={route.path} key={route.path}>
        <route.component />
      </Route>
    ))}
  </Switch>
);

export default App;
