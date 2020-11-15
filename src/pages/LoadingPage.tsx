import React from 'react';
import { Spinner, Box } from '@chakra-ui/react';

type LoadingPageProps = {
  width: string;
  height: string;
};

const LoadingPage: React.FC<LoadingPageProps> = ({
  width = '100%',
  height = '100%',
}) => (
  <Box w={width} h={height}>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);

export default LoadingPage;
