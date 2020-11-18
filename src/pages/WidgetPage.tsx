import {
  Box, Center, Image, SimpleGrid,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import dracula from 'prism-react-renderer/themes/dracula';
import { useRecoilState, useSetRecoilState } from 'recoil';
import LogoIcon from '../assets/logo-icon.svg';
import WidgetPageLeft from '../organisms/WidgetPageLeft';
import { originalSelectedWidgetState, selectedWidgetState } from '../recoil/atoms';
import LoadingPage from './LoadingPage';
import { getWidget } from '../services/widget.services';
import { getScopeFromWidget } from '../utils/widget.utils';

type WidgetPageProps = {
  id: string;
}

type WidgetPageState = {
  loading: boolean,
  hasInitialized: boolean,
}

const WidgetPage: React.FC<WidgetPageProps> = ({ id }) => {
  const [state, setState] = useState<WidgetPageState>({
    loading: true,
    hasInitialized: false,
  });

  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);
  const setOriginalSelectedWidget = useSetRecoilState(originalSelectedWidgetState);

  useEffect(() => {
    if (!state.hasInitialized) {
      getWidget(id).then((widget) => {
        setSelectedWidget(widget);
        setOriginalSelectedWidget(widget);
      });
      setState({
        loading: false,
        hasInitialized: true,
      });
    }
  }, []);

  if (state.loading || !selectedWidget) {
    return <LoadingPage />;
  }

  return (
    <LiveProvider theme={dracula} code={selectedWidget.code} scope={getScopeFromWidget(selectedWidget)}>
      <SimpleGrid columns={2} h="100vh">
        <Box w="100%" overflow="scroll">
          <Box width="500px" mx="auto">
            <Image src={LogoIcon} mt={5} />
            <WidgetPageLeft />
          </Box>
        </Box>
        <Box w="100%" bgColor="gray.200" h="100%">
          <Center h="100%">
            <Box bgColor="white" w="365px" h="365px">
              <Center h="100%">
                <LivePreview />
              </Center>
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
    </LiveProvider>
  );
};

export default WidgetPage;
