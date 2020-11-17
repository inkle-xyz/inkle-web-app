/* eslint-disable react/jsx-first-prop-new-line */
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Flex, FormLabel, Textarea, Text, Input, Switch, Divider, InputGroup, InputRightAddon, Spacer, Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/all';
import { LiveEditor, LiveError } from 'react-live';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';

const prebuiltCode = `
() => (
  <h3>
    So functional. Much wow!
  </h3>
)
`;

const WidgetPageLeft: React.FC = () => {
  const [code, setCode] = useState(prebuiltCode);

  return (
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
        {/* Really nasty workaround down here I wish we didn't need
        // @ts-ignore */}
        <LiveEditor onChangeCapture={(e) => console.log(e.currentTarget?.firstChild.value)}
          style={{ height: '400px', borderRadius: '4px', overflow: 'scroll' }}
        />
        <LiveError />

      </WidgetFormGroup>
    </Box>
  );
};

export default WidgetPageLeft;
