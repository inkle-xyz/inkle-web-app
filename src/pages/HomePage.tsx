import { Box } from '@chakra-ui/react';
import React from 'react';
import SearchSortBar from '../organisms/search-sort-bar';

const HomePage: React.FC = () => {
  const searchHandler = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  const sortHandler = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  return (
    <Box mt={5}>
      <SearchSortBar title="My Widgets" searchHandler={searchHandler} sortHandler={sortHandler} options={['By Name']} />
    </Box>
  );
};

export default HomePage;
