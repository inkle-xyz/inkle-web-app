import {
  Box, Center, Image, SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import dracula from 'prism-react-renderer/themes/dracula';
import { useRecoilState } from 'recoil';
import LogoIcon from '../assets/logo-icon.svg';
import WidgetPageLeft from '../organisms/WidgetPageLeft';
import { widgetVariableState } from '../recoil/atoms';

const prebuiltCode = `
() => (
  <h3>
    So functional. Much wow! {widget_name}
  </h3>
)
`;

const WidgetPage: React.FC = () => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  const passedProps: Record<string, any> = {};

  for (let i = 0; i < widgetVariables.length; i++) {
    passedProps[widgetVariables[i].name] = widgetVariables[i].defaultValue;
  }

  console.log(passedProps);

  return (
    <LiveProvider theme={dracula} code={prebuiltCode} scope={passedProps}>
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
                <LivePreview />

                {/*  <Box textAlign="center"> */}
                {/*    <Heading size="3xl"> */}
                {/*      07:54:34 */}
                {/*    </Heading> */}
                {/*    <Text fontSize="lg" color="gray.300" mt={3}>Friday</Text> */}
                {/*  </Box> */}
              </Center>
            </Box>
          </Center>
        </Box>
      </SimpleGrid>
    </LiveProvider>
  );
};

export default WidgetPage;
