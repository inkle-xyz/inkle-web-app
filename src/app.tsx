import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AppContainer from './containers/AppContainer';
import WidgetPage from './pages/WidgetPage';

const App: React.FC = () => (
  <Switch>
    <Redirect from="/widget" to="/" exact />
    <Route
      path="/widget/:id"
      render={
      (props) => <WidgetPage id={props.match.params.id} />
    }
    />
    <Route path="/auth" component={AuthPage} exact />
    <AppContainer>
      <Route path="/" component={HomePage} exact />
    </AppContainer>
  </Switch>
);

export default App;
