import React, { useState, useEffect } from 'react';
import {
  Box, Center, SimpleGrid, Spinner, useToast,
} from '@chakra-ui/react';
import { Widget } from '../interfaces/widget.interface';
import { getCommunityWidgets } from '../services/widget.services';
import WidgetCard from '../molecules/WidgetCard';
import SearchSortBar from './SearchSortBar';

const CommunityWidgets: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [startAt, setStartAt] = useState(0);
  const toast = useToast();
  const numberOfWidgetsToFetch = 8;

  const handleScroll = (): void => {
    if (
      Math.ceil(
        window.innerHeight + document.documentElement.scrollTop,
      ) !== document.documentElement.offsetHeight
      || isFetching
    ) return;
    console.log('Scrolling');
    setIsFetching(true);
  };

  const getWidgets = async () => {
    try {
      console.log('Getting Widgets');
      console.log('startAt', startAt);
      console.log('numberOfWidgetsToFetch', numberOfWidgetsToFetch);
      setIsFetching(true);
      const oldWidgets = JSON.parse(JSON.stringify(widgets));
      const newWidgets = await getCommunityWidgets(numberOfWidgetsToFetch, widgets[widgets.length]?.name);
      setStartAt(startAt + numberOfWidgetsToFetch);
      setWidgets(oldWidgets + newWidgets);
      setIsFetching(false);
      setIsLoading(false);
    } catch (e) {
      toast({
        status: 'error',
        title: 'Error Getting Community Widgets',
        description: e.toString(),
      });
    }
  };

  useEffect(() => {
    getWidgets();
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getWidgets();
  }, [isFetching]);

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
      { isLoading
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
            widgets
              .map((widget) => (
                <WidgetCard
                  name={widget.name}
                  description={widget.description}
                  author={widget.author}
                  id={widget.id}
                  image={widget.image}
                />
              ))
          }
            {isFetching && (
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
