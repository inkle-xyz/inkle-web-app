import { Box } from '@chakra-ui/react';
import React from 'react';
import CommunityWidgets from '../organisms/CommunityWidgets';
import UserWidgets from '../organisms/UserWidgets';

const DashboardPage: React.FC = () => (
  <Box>
    <UserWidgets />
    <CommunityWidgets />
  </Box>
);

export default DashboardPage;
