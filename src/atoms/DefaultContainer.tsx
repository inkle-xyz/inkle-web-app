import React from 'react';
import { Container } from '@chakra-ui/react';

type Props = {
  maxW?: string;
}

const DefaultContainer: React.FC<Props> = ({ children, maxW = '1440px' }) => (
  <Container maxW={maxW} px="4rem">
    {children}
  </Container>
);

export default DefaultContainer;
