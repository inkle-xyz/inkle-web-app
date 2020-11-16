import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

type Props = {
  title: string;
}

const WidgetFormGroup: React.FC<Props> = ({ children, title }) => (
  <Box mt={4}>
    <Heading as="h4" size="md">{title}</Heading>
    { children }
  </Box>
);

export default WidgetFormGroup;
