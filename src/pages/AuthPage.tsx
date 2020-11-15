import { Button, Container } from '@chakra-ui/react';
import React from 'react';
import { FaGoogle } from 'react-icons/all';

const AuthPage: React.FC = () => (
  <Container>
    <Button leftIcon={<FaGoogle />} colorScheme="red">Login With Google</Button>
  </Container>
);

export default AuthPage;
