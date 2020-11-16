import { Box, Button, Center } from '@chakra-ui/react';
import React from 'react';

const EmptyWidgetCard: React.FC = () => (
  <Box borderWidth="3px" borderStyle="dashed" borderColor="gray.300" borderRadius="lg" w="100%">
    <Center w="100%" h="100%">
      <Button my="auto" mx="auto" colorScheme="yellow" color="white">+ Add New Widget</Button>
    </Center>
  </Box>
);

export default EmptyWidgetCard;
