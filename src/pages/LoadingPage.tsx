import React from 'react';
import { Spinner, Box, Center } from '@chakra-ui/react';

type LoadingPageProps = {
  width?: string;
  height?: string;
};

const LoadingPage: React.FC<LoadingPageProps> = ({
  width = '100%',
  height = '100vh',
}) => (
  <Box w={width} h={height}>
    <Center h={height}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow.500"
        size="xl"
      />
    </Center>
  </Box>
);

export default LoadingPage;
