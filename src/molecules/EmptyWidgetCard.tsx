import {
  Box, Button, Center, Flex,
} from '@chakra-ui/react';
import React from 'react';

const EmptyWidgetCard: React.FC = () => (
  <Box borderWidth="3px" borderStyle="dashed" borderColor="gray.300" borderRadius="lg" w="100%" h="450px">
    <Center w="100%" h="100%">
      <Button my="auto" mx="auto" colorScheme="yellow" color="white">+ Create New Widget</Button>
    </Center>
  </Box>
);

export default EmptyWidgetCard;
