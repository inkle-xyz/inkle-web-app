import {
  Box, Center, Heading, Image, SimpleGrid, Text,
} from '@chakra-ui/react';
import React from 'react';
import WidgetPageLeft from '../organisms/WidgetPageLeft';
import LogoIcon from '../assets/logo-icon.svg';

const WidgetPage: React.FC = () => (
  <SimpleGrid columns={2} h="100vh">
    <Box w="100%" overflow="scroll">
      <Box maxWidth="500px" mx="auto">
        <Image src={LogoIcon} mt={5} />
        <WidgetPageLeft />
      </Box>
    </Box>
    <Box w="100%" bgColor="gray.200" h="100%">
      <Center h="100%">
        <Box bgColor="white" w="365px" h="365px">
          <Center h="100%">
            <Box textAlign="center">
              <Heading size="3xl">
                07:54:34
              </Heading>
              <Text fontSize="lg" color="gray.300" mt={3}>Friday</Text>
            </Box>
          </Center>
        </Box>
      </Center>
    </Box>
  </SimpleGrid>
);

export default WidgetPage;
