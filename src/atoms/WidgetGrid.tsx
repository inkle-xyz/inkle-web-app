import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const WidgetGrid: React.FC = ({ children }) => (
  <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} mt={10} mH="175px">
    {children}
  </SimpleGrid>
);

export default WidgetGrid;
