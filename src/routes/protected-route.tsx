import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthentication } from '../context/authentication';
import LoadingPage from '../pages/LoadingPage';

const ProtectedRoute: React.FC = ({ children, ...rest }) => {
  const { isFetchingUser, isLoggedIn } = useAuthentication();

  return (
    <Route
      {...rest}
      render={() => (isFetchingUser ? (
        <LoadingPage />
      ) : isLoggedIn ? (
        { children }
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default ProtectedRoute;
