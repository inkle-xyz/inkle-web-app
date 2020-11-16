import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

const RootProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    <ChakraProvider>
      {children}
    </ChakraProvider>
  </BrowserRouter>
);

export default RootProvider;
