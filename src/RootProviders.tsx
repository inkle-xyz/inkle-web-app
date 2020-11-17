import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

const RootProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    <ChakraProvider>
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </ChakraProvider>
  </BrowserRouter>
);

export default RootProvider;
