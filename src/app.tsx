import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AppContainer from './containers/AppContainer';
import WidgetPage from './pages/WidgetPage';

const App: React.FC = () => (
  <Switch>
    <Route path="/widget" component={WidgetPage} exact />
    <Route path="/auth" component={AuthPage} exact />
    <AppContainer>
      <Route path="/" component={HomePage} exact />
    </AppContainer>
  </Switch>
);

export default App;
