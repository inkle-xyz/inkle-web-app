import React, { useEffect, useState } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import SearchSortBar from './SearchSortBar';
import WidgetCard from '../molecules/WidgetCard';
import EmptyWidgetCard from '../molecules/EmptyWidgetCard';
import { cloneWidget, createNewWidget, getUsersWidgets } from '../services/widget.services';
import { Widget } from '../interfaces/widget.interface';
import { userState, usersWidgetsState } from '../recoil/atoms';

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
  const user = useRecoilValue(userState);

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

  const onWidgetClone = (widget: Widget) => {
    if (user) {
      cloneWidget(user, widget).then(() => getUsersWidgets().then((widgets) => setUsersWidgets(widgets)));
    } else {
      toast({
        status: 'error',
        title: 'Error cloning widget',
        description: 'Please refresh page',
      });
    }
  };

  const onWidgetCreate = () => {
    if (user) {
      createNewWidget(user).then(() => getUsersWidgets().then((widgets) => setUsersWidgets(widgets)));
    }
  };

  const getWidgetsToRender = (): Widget[] => (state.isFiltered
    ? state.filteredUserWidgets : usersWidgets ?? []);

  return (
    <Box mt="4rem">
      <SearchSortBar
        title="My Widgets 📚"
        searchHandler={searchHandler}
        options={['By Name']}
      />
      { state.loading
        ? (
          <Center h="100%">
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
                  onClone={onWidgetClone}
                  widget={widget}
                  key={widget.id}
                />
              ))
          }
            <EmptyWidgetCard onWidgetCreate={onWidgetCreate} />
          </SimpleGrid>
        )}
    </Box>
  );
};

export default UserWidgets;
