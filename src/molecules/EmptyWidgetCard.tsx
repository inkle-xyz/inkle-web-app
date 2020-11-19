import {
  Box, Button, Center,
} from '@chakra-ui/react';
import React from 'react';

type Params = {
  onWidgetCreate: () => void;
}

const EmptyWidgetCard: React.FC<Params> = ({ onWidgetCreate }) => (
  <Box borderWidth="3px" borderStyle="dashed" borderColor="gray.300" borderRadius="lg" w="100%" h="175px">
    <Center w="100%" h="100%">
      <Button
        my="auto"
        mx="auto"
        colorScheme="yellow"
        color="white"
        onClick={() => onWidgetCreate()}
      >
        + Create New Widget
      </Button>
    </Center>
  </Box>
);

export default EmptyWidgetCard;
