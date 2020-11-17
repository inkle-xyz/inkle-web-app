import { Box, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SearchSortBar from '../organisms/SearchSortBar';
import WidgetCard from '../molecules/WidgetCard';
import UserWidgets from '../organisms/UserWidgets';

const HomePage: React.FC = () => {
  const searchHandler = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  const sortHandler = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  return (
    <Box>
      <UserWidgets />
      <Box mt="4rem">
        <SearchSortBar
          title="Explore Widgets"
          searchHandler={searchHandler}
          sortHandler={sortHandler}
          options={['By Name']}
        />
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} mt={10}>
          {/* <WidgetCard /> */}
          {/* <WidgetCard /> */}
          {/* <WidgetCard /> */}
          {/* <WidgetCard /> */}
          {/* <WidgetCard /> */}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomePage;
