import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useToast } from '@chakra-ui/react';

type Props = {
  path: string,
  render: (props: RouteComponentProps<any>) => React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ path, isAuthenticated, render }) => {
  const toast = useToast();

  return (
    <Route
      path={path}
      exact
      render={(props) => {
        if (isAuthenticated) {
          return render(props);
        }
        toast({
          status: 'error',
          title: 'Please Log In First!',
          duration: 1000,
        });
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
