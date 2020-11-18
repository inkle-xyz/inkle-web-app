import React, { useState, useEffect } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Widget } from '../interfaces/widget.interface';
import { cloneWidget, getCommunityWidgets, getUsersWidgets } from '../services/widget.services';
import WidgetCard from '../molecules/WidgetCard';
import SearchSortBar from './SearchSortBar';
import { userState, usersWidgetsState } from '../recoil/atoms';

type CommunityWidgetsState = {
  widgets: Widget[];
  startAt: number;
  isInitialized: boolean;
  isLoading: boolean;
}

const CommunityWidgets: React.FC = () => {
  const [state, setState] = useState<CommunityWidgetsState>({
    widgets: [],
    startAt: 1,
    isInitialized: false,
    isLoading: true,
  });

  const toast = useToast();
  const user = useRecoilValue(userState);
  const setUsersWidgets = useSetRecoilState(usersWidgetsState);

  const numberOfWidgetsToFetch = 8;

  useEffect(() => {
    getCommunityWidgets(numberOfWidgetsToFetch, state.widgets[state.widgets.length]?.name).then((widgets) => {
      setState((s) => ({
        ...s,
        isLoading: false,
        isInitialized: true,
        startAt: s.startAt + numberOfWidgetsToFetch,
        widgets,
      }));
    });
    // eslint-disable-next-line
  }, []);

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

  return (
    <Box my="4rem">
      <SearchSortBar
        title="Community 🌱"
        options={['By Name']}
      />
      { state.isLoading
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
            state.widgets
              .map((widget) => (
                <WidgetCard
                  isCommunity
                  onClone={onWidgetClone}
                  key={widget.id}
                  widget={widget}
                />
              ))
          }
          </SimpleGrid>
        )}
    </Box>
  );
};

export default CommunityWidgets;
