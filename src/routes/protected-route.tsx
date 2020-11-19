import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useToast } from '@chakra-ui/react';
import { auth } from '../firebase.config';

type Props = {
  path: string,
  render: (props: RouteComponentProps<any>) => React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ render, path }) => {
  const [isUser, setIsUser] = useState<boolean | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsUser(typeof user !== 'undefined');
    });
  }, [setIsUser]);

  return (
    <Route
      path={path}
      exact
      render={(props) => {
        if (isUser) {
          return render(props);
        }
        toast({
          status: 'error',
          title: 'Please Log In First!',
        });
        return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoute;
