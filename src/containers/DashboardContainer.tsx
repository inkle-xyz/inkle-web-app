import React from 'react';
import { Container } from '@chakra-ui/react';
import DashboardNavbar from '../organisms/DashboardNavbar';

const DashboardContainer: React.FC = ({ children }) => (
  <Container maxW="1440px">
    <DashboardNavbar />
    { children }
  </Container>
);

export default DashboardContainer;
