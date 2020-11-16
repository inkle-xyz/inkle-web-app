import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AppContainer from './containers/AppContainer';

const App: React.FC = () => (
  <Switch>
    <AppContainer>
      <Route path="/" component={HomePage} exact />
    </AppContainer>
    <Route path="/auth" component={AuthPage} exact />

  </Switch>
);

export default App;
