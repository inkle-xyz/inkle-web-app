import { Box, Center, Icon } from '@chakra-ui/react';
import React from 'react';
import { BiCard } from 'react-icons/all';

const NoWidgetImage: React.FC = () => (
  <Box h="100%" w="100%" bgColor="gray.300">
    <Center h="100%">
      <Icon as={BiCard} w={14} h={14} color="gray.600" />
    </Center>
  </Box>
);

export default NoWidgetImage;
