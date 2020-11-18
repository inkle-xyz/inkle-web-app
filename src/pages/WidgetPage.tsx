import {
  Box, Center, Image, SimpleGrid,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LivePreview, LiveProvider } from 'react-live';
import dracula from 'prism-react-renderer/themes/dracula';
import { useRecoilValue } from 'recoil';
import LogoIcon from '../assets/logo-icon.svg';
import WidgetPageLeft from '../organisms/WidgetPageLeft';
import { widgetVariableState } from '../recoil/atoms';
import LoadingPage from './LoadingPage';

const prebuiltCode = `
class Counter extends React.Component {
  constructor() {
    super()
    this.state = { time: new Date().toLocaleTimeString() }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(() => ({ time: new Date().toLocaleTimeString() }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <h3 style={{fontWeight: 'bold', fontSize: '24px'}}>
          {this.state.time}
        </h3>
      </div>
    )
  }
}
`;

type WidgetPageProps = {
  id: string;
}

type WidgetPageState = {

}

const WidgetPage: React.FC<WidgetPageProps> = ({ id }) => {
  const widgetVariables = useRecoilValue(widgetVariableState);

  const [widgetPageState, setWidgetPageState] = useState();

  const passedProps: Record<string, any> = {};

  useEffect(() => {
    for (let i = 0; i < widgetVariables.length; i += 1) {
      passedProps[widgetVariables[i].name] = widgetVariables[i].defaultValue;
    }
  });

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
