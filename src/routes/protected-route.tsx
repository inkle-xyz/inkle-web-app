import React, { useEffect, useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { auth } from '../firebase.config';
import LoadingPage from '../pages/LoadingPage';

const ProtectedRoute: React.FC = ({ children, ...rest }) => {
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
      history.push('/login');
    }
  }), [setAuthState]);
  return (
    <Route
      {...rest}
      render={() => (authState.initializing ? (
        <LoadingPage />
      ) : authState.isAuthenticated ? (
        { children }
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default ProtectedRoute;
