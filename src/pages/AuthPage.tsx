import { Button, Container } from '@chakra-ui/react';
import React from 'react';
import { FaGoogle } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { authenticateUser } from '../utils/auth.utils';

const AuthPage: React.FC = () => {
  const history = useHistory();

  const onClick = () => {
    authenticateUser().then((user) => {
      console.log(user);
      history.push('/');
    });
  };

  return (
    <Container>
      <Button leftIcon={<FaGoogle />} colorScheme="red" onClick={onClick}>Login With Google</Button>
    </Container>
  );
};

export default AuthPage;
