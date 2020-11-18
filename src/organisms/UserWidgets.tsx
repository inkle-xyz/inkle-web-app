import React, { useEffect, useState } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import SearchSortBar from './SearchSortBar';
import WidgetCard from '../molecules/WidgetCard';
import EmptyWidgetCard from '../molecules/EmptyWidgetCard';
import { getUsersWidgets } from '../services/widget.services';
import { Widget } from '../interfaces/widget.interface';

type UserWidgetsState = {
  usersWidgets: Widget[];
  filteredUserWidgets: Widget[];
  loading: boolean;
  isFiltered: boolean;
  hasLoaded: boolean;
}

const UserWidgets: React.FC = () => {
  const [state, setState] = useState<UserWidgetsState>({
    usersWidgets: [],
    filteredUserWidgets: [],
    loading: true,
    isFiltered: false,
    hasLoaded: false,
  });

  const toast = useToast();

  useEffect(() => {
    if (!state.hasLoaded) {
      getUsersWidgets().then((widgets) => setState({
        usersWidgets: widgets,
        filteredUserWidgets: widgets,
        loading: false,
        isFiltered: false,
        hasLoaded: true,
      })).catch((error) => toast({
        status: 'error',
        title: error.toString(),
      }));
    }
  });

  const searchHandler = (searchTerm: string): void => {
    const filteredWidgets = state.usersWidgets.filter((s) => s.name.includes(searchTerm));
    if (searchTerm !== '') {
      setState({
        ...state,
        filteredUserWidgets: filteredWidgets,
        isFiltered: true,
      });
    } else {
      setState({
        ...state,
        isFiltered: false,
      });
    }
  };

  const getWidgetsToRender = (): Widget[] => (state.isFiltered
    ? state.filteredUserWidgets : state.usersWidgets);

  const sortHandler = (searchTerm: string): void => {
    // console.log(searchTerm);
  };

  return (
    <Box mt="4rem">
      <SearchSortBar
        title="My Widgets"
        searchHandler={searchHandler}
        sortHandler={sortHandler}
        options={['By Name']}
      />
      { state.loading
        ? (
          <Center h="450px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )
        : (
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} mt={10}>
            {
            getWidgetsToRender()
              .map((widget) => (
                <WidgetCard
                  widget={widget}
                  key={widget.id}
                />
              ))
          }
            <EmptyWidgetCard />
          </SimpleGrid>
        )}
    </Box>
  );
};

export default UserWidgets;
