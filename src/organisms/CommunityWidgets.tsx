import React, { useState, useEffect } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { Widget } from '../interfaces/widget.interface';
import { getCommunityWidgets } from '../services/widget.services';
import WidgetCard from '../molecules/WidgetCard';
import SearchSortBar from './SearchSortBar';

type CommunityWidgetsState = {
  widgets: Widget[];
  startAt: number;
  isInitialized: boolean;
  isLoading: boolean;
  isFetchingData: boolean;
}

const CommunityWidgets: React.FC = () => {
  const [state, setState] = useState<CommunityWidgetsState>({
    widgets: [],
    startAt: 1,
    isInitialized: false,
    isLoading: true,
    isFetchingData: false,
  });

  const toast = useToast();
  const numberOfWidgetsToFetch = 8;

  const getWidgets = async () => {
    try {
      console.log('Getting Widgets');
      console.log('startAt', state.startAt);
      console.log('numberOfWidgetsToFetch', numberOfWidgetsToFetch);
      console.log('Existing widgets', state.widgets);
      const oldWidgets: [] = JSON.parse(JSON.stringify(state.widgets));
      const newWidgets = await getCommunityWidgets(numberOfWidgetsToFetch, state.widgets[state.widgets.length]?.name);
      console.log(oldWidgets);
      console.log(newWidgets);
      console.log();
      setState({
        ...state,
        isFetchingData: false,
        startAt: state.startAt + numberOfWidgetsToFetch,
        widgets: newWidgets,
      });
    } catch (e) {
      toast({
        status: 'error',
        title: 'Error Getting Community Widgets',
        description: e.toString(),
      });
    }
  };

  const handleScroll = (): void => {
    if (
      Math.ceil(
        window.innerHeight + document.documentElement.scrollTop,
      ) !== document.documentElement.offsetHeight
      || state.isFetchingData
    ) return;
    console.log('Scrolling');
    setState({
      ...state,
      isFetchingData: true,
    });
    getWidgets();
  };

  useEffect(() => {
    getCommunityWidgets(numberOfWidgetsToFetch, state.widgets[state.widgets.length]?.name).then((widgets) => {
      setState({
        ...state,
        isLoading: false,
        isInitialized: true,
        startAt: state.startAt + numberOfWidgetsToFetch,
        widgets,
      });
    });
  }, []);

  const searchHandler = (value: string) => console.log(value);
  const sortHandler = (value: string) => console.log(value);

  return (
    <Box mt="4rem">
      <SearchSortBar
        title="My Widgets"
        searchHandler={searchHandler}
        sortHandler={sortHandler}
        options={['By Name']}
      />
      { state.isLoading
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
            state.widgets
              .map((widget) => (
                <WidgetCard
                  key={widget.id}
                  widget={widget}
                />
              ))
          }
            {state.isFetchingData && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="yellow.500"
              size="md"
            />
            )}
          </SimpleGrid>
        )}
    </Box>
  );
};

export default CommunityWidgets;
