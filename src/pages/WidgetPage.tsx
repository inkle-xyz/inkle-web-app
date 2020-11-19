import {
  Alert,
  Box, Center, Flex, Heading, IconButton, Image, SimpleGrid, Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import dracula from 'prism-react-renderer/themes/dracula';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { Resizable } from 're-resizable';
import styled from '@emotion/styled';
import { ArrowBackIcon } from '@chakra-ui/icons';
import LogoIcon from '../assets/logo-icon.svg';
import WidgetPageLeft from '../organisms/WidgetPageLeft';
import { originalSelectedWidgetState, selectedWidgetState, userWidgetCodeState } from '../recoil/atoms';
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

  const history = useHistory();

  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);
  const setOriginalSelectedWidget = useSetRecoilState(originalSelectedWidgetState);
  const [editedCode, setEditedCode] = useRecoilState(userWidgetCodeState);

  useEffect(() => {
    if (!state.hasInitialized) {
      getWidget(id).then((widget) => {
        setSelectedWidget(widget);
        setOriginalSelectedWidget(widget);
        setEditedCode(widget.code);
      }).catch((e: Error) => {
        if (e.message === 'Widget not found') {
          history.goBack();
        }
      });
      setState({
        loading: false,
        hasInitialized: true,
      });
    }
    // eslint-disable-next-line
  }, []);

  if (state.loading || !selectedWidget) {
    return <LoadingPage />;
  }

  return (
    <LiveProvider
      theme={dracula}
      code={editedCode}
      scope={{
        ...getScopeFromWidget(selectedWidget),
        styled,
        isDarkMode: selectedWidget.isDarkMode,
        authorName: selectedWidget.authorName,
      }}
    >
      <SimpleGrid columns={{ sm: 1, lg: 2 }} h="100vh" display={{ base: 'block', md: 'grid' }}>
        <Box w="100%" overflowY="scroll">
          <Box width="500px" mx="auto" display={{ base: 'none', md: 'block' }}>
            <Image src={LogoIcon} mt={5} />
            <WidgetPageLeft />
          </Box>
          <Box display={{ base: 'block', md: 'none' }} py="2rem" px="3rem">
            <Flex alignItems="center">
              <IconButton
                aria-label="Icon button"
                variant="ghost"
                onClick={() => {
                  setSelectedWidget(null);
                  history.goBack();
                }}
                mr={4}
                icon={<ArrowBackIcon w={8} h={8} />}
              />
              <Heading
                fontSize="3xl"
                fontWeight="bold"
                mb={2}
              >
                {selectedWidget?.name}
              </Heading>
            </Flex>
            <Text color="gray.500" fontSize="sm" mt={2}>
              Made By
              {' '}
              {selectedWidget?.authorName}
            </Text>
            <Text mt={2}>
              {selectedWidget.description}
            </Text>
            <Text color="gray.500" fontSize="sm" mt={2} fontStyle="italic">
              Sorry, we don't support editing widgets on mobile yet :(
            </Text>
          </Box>
        </Box>
        <Box w="100%" bgColor="gray.200" h="100%">
          <Center h="100%">
            <Box>
              <Alert
                status="info"
                display={{ base: 'none', md: 'block' }}
                mb={4}
                textAlign="center"
                variant="solid"
                w="450px"
                mx="auto"
              >
                <span role="img" aria-label="Lightbulb Emoji">💡</span>
                {' '}
                Drag the border to preview this widget in different sizes
              </Alert>
              <Resizable
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  overflow: 'hidden',
                }}
                defaultSize={{
                  height: '365px',
                  width: '365px',
                }}
              >
                <Box
                  bgColor={
                    selectedWidget.isDarkMode
                      ? '#2F3437' : 'white'
                  }
                  w="100%"
                  h="100%"
                  color={
                    selectedWidget.isDarkMode
                      ? 'white' : 'gray.800'
                  }
                >
                  <LivePreview />
                </Box>
              </Resizable>
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
    </LiveProvider>
  );
};

export default WidgetPage;
