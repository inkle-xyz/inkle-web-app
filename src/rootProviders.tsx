import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { FirebaseProvider } from './context/firebase';
import { AuthenticationProvider } from './context/authentication';

type RootProviderProps = {
  children: React.ReactNode;
};

export const RootProvider = ({ children }: RootProviderProps) => (
  <BrowserRouter>
    <ChakraProvider>
      <FirebaseProvider>
        <AuthenticationProvider>{children}</AuthenticationProvider>
      </FirebaseProvider>
    </ChakraProvider>
  </BrowserRouter>
);
