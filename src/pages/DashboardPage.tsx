import { Box } from '@chakra-ui/react';
import React from 'react';
import CommunityWidgets from '../organisms/CommunityWidgets';
import UserWidgets from '../organisms/UserWidgets';
import NavbarContainer from '../atoms/DefaultContainer';
import SectionCallout from '../organisms/SectionCallout';

const DashboardPage: React.FC = () => (
  <Box>
    <NavbarContainer>
      <UserWidgets />
      <CommunityWidgets />
    </NavbarContainer>
    <SectionCallout />
  </Box>
);

export default DashboardPage;
