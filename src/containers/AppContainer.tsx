import React from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from '../organisms/Navbar';

const AppContainer: React.FC = ({ children }) => (
  <Container maxW="1440px">
    <Navbar />
    { children }
  </Container>
);

export default AppContainer;
