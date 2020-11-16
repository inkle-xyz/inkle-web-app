import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { auth } from '../firebase.config';
import LoadingPage from '../pages/LoadingPage';

type Props = {
  exact: boolean,
  path: string,
  component: React.FC
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: true,
    initializing: true,
  });
  const history = useHistory();

  useEffect(() => auth.onAuthStateChanged((user) => {
    if (user) {
      setAuthState({
        isAuthenticated: true,
        initializing: false,
      });
    } else {
      history.push('/auth');
    }
  }), [setAuthState]);
  return (
    authState.initializing ? <LoadingPage /> : (
      <Route
        {...rest}
        component={() => (
          <Component />
        )}
      />
    )
  );
};

export default ProtectedRoute;
