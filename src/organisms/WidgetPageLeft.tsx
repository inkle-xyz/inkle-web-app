import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Flex, FormLabel, Textarea, Text, Input, Switch, Divider, InputGroup, InputRightAddon, Spacer, Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiCopy } from 'react-icons/all';
import dracula from 'prism-react-renderer/themes/dracula';
import { LiveEditor, LiveProvider } from 'react-live';
import styled from '@emotion/styled';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';

const prebuiltCode = `
const Wrapper = ({ children }) => (
  <div style={{
    background: 'papayawhip',
    width: '100%',
    padding: '2rem'
  }}>
    {children}
  </div>
)

const Title = () => (
  <h3 style={{ color: 'palevioletred' }}>
    Hello World!
  </h3>
)

render(
  <Wrapper>
    <Title />
  </Wrapper>
)
`;

const WidgetPageLeft: React.FC = () => (
  <Box mt="4rem">
    <Flex alignItems="center">
      <ArrowBackIcon w={8} h={8} mr={4} />
      <WidgetTitleEditable />
    </Flex>

    <Box>
      <FormLabel color="gray.300">
        Description
      </FormLabel>
      <Textarea placeholder="Widget description" />
    </Box>

    <WidgetFormGroup title="Data">
      <Box mt={2}>
        <FormLabel color="gray.300">
          variable_one - variable description goes right here
        </FormLabel>
        <Input placeholder="Example input" />
      </Box>
      <Box mt={2}>
        <FormLabel color="gray.300">
          variable_two - variable description goes right here
        </FormLabel>
        <Input placeholder="Example input" />
      </Box>
    </WidgetFormGroup>
    <WidgetFormGroup title="Style">
      <Flex mt={4} w="100%">
        <FormLabel color="gray.500" htmlFor="dark-mode">
          Dark Mode
        </FormLabel>
        <Spacer />
        <Switch id="dark-mode" mt={1} />
      </Flex>
    </WidgetFormGroup>
    <WidgetFormGroup title="Notion Link">
      <InputGroup mt={4}>
        <Input
          type="phone"
          borderLeftRadius="0"
          value="inkle.xyz/widgets/GeuIflafaqcnvmNfeaqpzp"
          color="black"
          fontWeight="semibold"
          isDisabled
        />
        <InputRightAddon bgColor="gray.700" color="white">
          <FiCopy />
        </InputRightAddon>
      </InputGroup>
    </WidgetFormGroup>
    <Divider my={5} />
    <WidgetFormGroup title="Editor">
      <Box mt={3} p={3} borderWidth="1px" borderRadius="lg">
        <Text color="gray.700" fontWeight="semibold">
          Variable Name
        </Text>
        <Input placeholder="variable_name" mt={2} />
        <Text mt={3} color="gray.700" fontWeight="semibold">
          Description
        </Text>
        <Textarea placeholder="Text Description" mt={2} />
      </Box>
      <Button variant="outline" size="md" colorScheme="blue" mt={4}>+ Add A Variable</Button>
    </WidgetFormGroup>

    <WidgetFormGroup title="Editor">
      <Text color="gray.500" mb={4}>
        Edit the code that renders the component.
      </Text>
      <LiveProvider theme={dracula} code={prebuiltCode} scope={{ styled }}>
        <LiveEditor style={{ height: '400px', borderRadius: '4px', overflow: 'scroll' }} />
      </LiveProvider>
    </WidgetFormGroup>
  </Box>
);

export default WidgetPageLeft;
