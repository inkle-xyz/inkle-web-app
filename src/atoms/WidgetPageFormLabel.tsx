import React from 'react';
import { FormLabel } from '@chakra-ui/react';

const WidgetPageFormLabel: React.FC = ({ children }) => (
  <FormLabel color="gray.300">
    {children}
  </FormLabel>
);

export default WidgetPageFormLabel;
