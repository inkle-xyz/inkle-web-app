import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NavbarContainer from './containers/DashboardContainer';
import WidgetPage from './pages/WidgetPage';
import ProtectedRoute from './routes/protected-route';
import WidgetForNotionPage from './pages/WidgetForNotionPage';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';

const App: React.FC = () => (
  <Switch>
    <Route path="/w/:id" render={(props) => <WidgetForNotionPage id={props.match.params.id} />} />
    <NavbarContainer>
      <Route path="/welcome" component={WelcomePage} exact />
      <Route path="/" component={HomePage} />
      <ProtectedRoute path="/dashboard" render={() => DashboardPage} />
    </NavbarContainer>
    <ProtectedRoute
      path="/widget/:id"
      render={
        (props) => <WidgetPage id={props.match.params.id} />
      }
    />
  </Switch>
);

export default App;
