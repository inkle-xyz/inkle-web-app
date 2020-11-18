import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import DashboardContainer from './containers/DashboardContainer';
import WidgetPage from './pages/WidgetPage';
import ProtectedRoute from './routes/protected-route';
import WidgetForNotionPage from './pages/WidgetForNotionPage';

const App: React.FC = () => (
  <Switch>
    <Redirect from="/widget" to="/" exact />
    <ProtectedRoute
      path="/widget/:id"
      render={
      (props) => <WidgetPage id={props.match.params.id} />
    }
    />
    <Route path="/w/:id" render={(props) => <WidgetForNotionPage id={props.match.params.id} />} />
    <Route path="/auth" component={AuthPage} exact />
    <DashboardContainer>
      <ProtectedRoute path="/" component={DashboardPage} exact />
    </DashboardContainer>
  </Switch>
);

export default App;
