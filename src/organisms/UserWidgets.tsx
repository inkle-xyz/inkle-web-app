import React, { useEffect, useState } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import SearchSortBar from './SearchSortBar';
import WidgetCard from '../molecules/WidgetCard';
import EmptyWidgetCard from '../molecules/EmptyWidgetCard';
import { getUsersWidgets } from '../services/widget.services';
import { Widget } from '../interfaces/widget.interface';
import { usersWidgetsState } from '../recoil/atoms';

type UserWidgetsState = {
  filteredUserWidgets: Widget[];
  loading: boolean;
  isFiltered: boolean;
  hasLoaded: boolean;
}

const UserWidgets: React.FC = () => {
  const [state, setState] = useState<UserWidgetsState>({
    filteredUserWidgets: [],
    loading: true,
    isFiltered: false,
    hasLoaded: false,
  });
  const [usersWidgets, setUsersWidgets] = useRecoilState(usersWidgetsState);

  const toast = useToast();

  useEffect(() => {
    if (!state.hasLoaded) {
      getUsersWidgets().then((widgets) => {
        setUsersWidgets(widgets);
        setState({
          filteredUserWidgets: widgets,
          loading: false,
          isFiltered: false,
          hasLoaded: true,
        });
      }).catch((error) => toast({
        status: 'error',
        title: error.toString(),
      }));
    }
  });

  const searchHandler = (searchTerm: string): void => {
    if (!usersWidgets) {
      return;
    }
    const filteredWidgets = usersWidgets.filter((s) => s.name.includes(searchTerm));
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
    ? state.filteredUserWidgets : usersWidgets ?? []);

  const sortHandler = (searchTerm: string): void => {
    // console.log(searchTerm);
  };

  return (
    <Box mt="4rem">
      <SearchSortBar
        title="My Widgets 📚"
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
