import { SearchIcon } from '@chakra-ui/icons';
import {
  Box, Flex, Input, InputLeftElement, InputGroup, Select, Heading,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  searchHandler: (searchTerm: string) => void
  sortHandler: (searchTerm: string) => void
  options: Array<string>
  title: string
}

const SearchSortBar: React.FC<Props> = ({
  searchHandler, sortHandler, options, title,
}) => {
  const onSearchChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    searchHandler(value);
  };

  const onSortChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    sortHandler(value);
  };

  return (
    <Flex
      wrap="wrap"
      justify="space-between"
    >
      <Flex
        alignItems="center"
      >
        <Heading as="h3" size="lg" whiteSpace="nowrap" mr={4}>{ title }</Heading>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search" onChange={onSearchChange} />
        </InputGroup>
      </Flex>
      <Box>
        <Select mr="1rem" onChange={onSortChange}>
          {
            options.map((value) => <option value={value} key={value}>{value}</option>)
          }
        </Select>
      </Box>
    </Flex>
  );
};

export default SearchSortBar;
