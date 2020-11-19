import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DashboardPage from './pages/DashboardPage';
import NavbarContainer from './containers/DashboardContainer';
import WidgetPage from './pages/WidgetPage';
import ProtectedRoute from './routes/protected-route';
import WidgetForNotionPage from './pages/WidgetForNotionPage';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import { userState } from './recoil/atoms';

const App: React.FC = () => {
  const user = useRecoilValue(userState);

  return (
    <Switch>
      <Route path="/w/:id" render={(props) => <WidgetForNotionPage id={props.match.params.id} />} />
      <ProtectedRoute
        path="/widget/:id"
        isAuthenticated={typeof user !== 'undefined'}
        render={
          (props) => <WidgetPage id={props.match.params.id} />
        }
      />
      <NavbarContainer>
        <Route path="/welcome" component={WelcomePage} exact />
        <ProtectedRoute
          path="/dashboard"
          render={() => <DashboardPage />}
          isAuthenticated={typeof user !== 'undefined'}
        />
        <Route path="/" component={HomePage} exact />
      </NavbarContainer>
    </Switch>
  );
};

export default App;
