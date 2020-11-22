import {
  Box, Center, Heading, Spinner, useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Footer from '../organisms/Footer';
import Navbar from '../organisms/Navbar';
import DefaultContainer from '../atoms/DefaultContainer';
import WidgetGrid from '../atoms/WidgetGrid';
import { getPublishedWidgets, updateWidgetInformation } from '../services/widget.services';
import { Widget } from '../interfaces/widget.interface';
import AdminWidgetCard from '../molecules/AdminWidgetCard';

type State = {
  widgets: Widget[],
  loading: boolean,
  hasLoaded: boolean,
}

const AdminPage: React.FC = () => {
  const [state, setState] = useState<State>({
    widgets: [],
    loading: true,
    hasLoaded: false,
  });

  const toast = useToast();

  useEffect(() => {
    if (!state.hasLoaded) {
      getPublishedWidgets().then((widgets) => {
        setState({
          widgets,
          loading: false,
          hasLoaded: true,
        });
      }).catch((error) => toast({
        status: 'error',
        title: error.toString(),
      }));
    }
  });

  return (
    <Box>
      <Navbar />
      <DefaultContainer>
        <Box my="4rem">
          <Heading>Admin</Heading>

          <Heading size="md" mt="2rem">Widgets Submitted</Heading>
          {state.loading
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
              <WidgetGrid>
                {
                  state.widgets
                    .map((widget) => (
                      <AdminWidgetCard
                        widget={widget}
                        key={widget.id}
                        onToggleFeatured={() => {
                          updateWidgetInformation(widget.id, { isFeatured: !widget.isFeatured }).then(() => {
                            getPublishedWidgets().then((widgets) => {
                              setState({
                                widgets,
                                loading: false,
                                hasLoaded: true,
                              });
                            }).catch((error) => toast({
                              status: 'error',
                              title: error.toString(),
                            }));
                          });
                        }}
                      />
                    ))
                }
              </WidgetGrid>
            )}
        </Box>
      </DefaultContainer>
      <Footer />
    </Box>
  );
};

export default AdminPage;
