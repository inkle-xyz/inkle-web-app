import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Flex,
} from '@chakra-ui/react';
import React from 'react';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';

const WidgetPageLeft: React.FC = () => (
  <Box mt="4rem">
    <Flex alignItems="center">
      <ArrowBackIcon w={8} h={8} mr={4} />
      <WidgetTitleEditable />
    </Flex>

  </Box>
);

export default WidgetPageLeft;
