import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { auth } from '../firebase.config';
import LoadingPage from '../pages/LoadingPage';

type Props = {
  exact?: boolean,
  path: string,
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  component?: React.FC
}

const ProtectedRoute: React.FC<Props> = ({ ...rest }) => {
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
    // eslint-disable-next-line
  }), []);
  return (
    authState.initializing ? <LoadingPage height="100vh" /> : (
      <Route
        {...rest}
      />
    )
  );
};

export default ProtectedRoute;
