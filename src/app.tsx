import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DashboardPage from './pages/DashboardPage';
import WidgetPage from './pages/WidgetPage';
import ProtectedRoute from './routes/protected-route';
import WidgetForNotionPage from './pages/WidgetForNotionPage';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import { userState } from './recoil/atoms';
import { getCurrentUser } from './services/auth.services';
import LoadingPage from './pages/LoadingPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';

const App: React.FC = () => {
  const [user, setUserState] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize global user state
  useEffect(() => {
    getCurrentUser().then((u) => {
      setUserState(u);
      setIsLoading(false);
    });
  }, [setUserState]);

  return (
    <Switch>
      {
        isLoading
          ? <LoadingPage />
          : (
            <>
              <Route path="/welcome" component={WelcomePage} exact />
              <ProtectedRoute
                path="/dashboard"
                render={() => <DashboardPage />}
                isAuthenticated={user !== null}
              />
              <ProtectedRoute
                path="/admin"
                render={() => <AdminPage />}
                isAuthenticated={user?.isAdmin ?? false}
              />
              <ProtectedRoute path="/account" render={() => <AccountPage />} isAuthenticated={user !== null} />
              <Route path="/" component={HomePage} exact />
              <Route path="/w/:id" render={(props) => <WidgetForNotionPage id={props.match.params.id} />} />
              <Route
                path="/widget/:id"
                render={
              (props) => (<WidgetPage id={props.match.params.id} />)
            }
              />
            </>
          )
      }

    </Switch>
  );
};

export default App;
