import React, { useState, useEffect } from 'react';
import {
  Box, Center, Heading, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Widget } from '../interfaces/widget.interface';
import { cloneWidget, getFeaturedWidgets, getUsersWidgets } from '../services/widget.services';
import WidgetCard from '../molecules/WidgetCard';
import SearchSortBar from './SearchSortBar';
import { userState, usersWidgetsState } from '../recoil/atoms';

type CommunityWidgetsState = {
  widgets: Widget[];
  startAt: number;
  isInitialized: boolean;
  isLoading: boolean;
}

type Props = {
  forHome?: boolean;
}

const CommunityWidgets: React.FC<Props> = ({ forHome }) => {
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
    getFeaturedWidgets(numberOfWidgetsToFetch, state.widgets[state.widgets.length]?.name).then((widgets) => {
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
        title={!forHome
          ? 'Featured Community Widgets 🌱' : ''}
        options={['By Name']}
      />
      {
        forHome ? (
          <Heading as="h3" size="md" whiteSpace="nowrap" textAlign="center" mr={4} mb={1}>
            Featured Community Widgets
            <span role="img" aria-label="Happy Face Emoji">🌱</span>
          </Heading>
        )
          : <Box />
      }
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
          <SimpleGrid columns={forHome ? { sm: 1, md: 2 } : { sm: 1, md: 3 }} spacing={10} mt={10}>
            {
            state.widgets
              .filter((widget) => (forHome
                ? true
                : widget.author !== user?.id))
              .map((widget) => (
                <WidgetCard
                  onClone={!forHome ? onWidgetClone : undefined}
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
