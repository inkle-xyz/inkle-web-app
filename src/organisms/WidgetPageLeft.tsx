/* eslint-disable react/jsx-first-prop-new-line */
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Flex, FormLabel, Textarea, Text, Input, Switch, Divider, InputGroup, InputRightAddon, Spacer, Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/all';
import { LiveEditor, LiveError } from 'react-live';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';
import { WidgetVariable, widgetVariableState } from '../recoil/atoms';

interface WidgetVariableBoxProps {
  widgetVariable: WidgetVariable;
}

/**
 * Higher order function to update a widgetVariables field
 * @param {string} field - The field to update
 * @param {Function} setFunction - the setState function to update the global state
 */
const updateWidgetVariableField = (
  field: string,
  setFunction: SetterOrUpdater<WidgetVariable[]>,
) => (newValue: string, id: string, widgetVariables: WidgetVariable[]) => {
  const newWidgetVariables = JSON.parse(JSON.stringify(widgetVariables));
  for (let i = 0; i < newWidgetVariables.length; i += 1) {
    if (newWidgetVariables[i].id === id) {
      newWidgetVariables[i][field] = newValue;
    }
  }
  setFunction(newWidgetVariables);
};

const WidgetVariableBox: React.FC<WidgetVariableBoxProps> = ({ widgetVariable: { name, description, id } }) => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  return (
    <Box mt={3} p={3} borderWidth="1px" borderRadius="lg">
      <Text color="gray.700" fontWeight="semibold">
        Variable Name
      </Text>
      <Input placeholder="variable_name"
        value={name}
        mt={2}
        onChange={(e) => updateWidgetVariableField(
          'name',
          setWidgetVariables,
        )(e.target.value, id, widgetVariables)}
      />
      <Text mt={3} color="gray.700" fontWeight="semibold">
        Description
      </Text>
      <Textarea placeholder="Text Description"
        value={description}
        mt={2}
        onChange={(e) => updateWidgetVariableField(
          'description',
          setWidgetVariables,
        )(e.target.value, id, widgetVariables)}
      />
    </Box>
  );
};

interface WidgetDefaultValueBoxProps {
  widgetVariable: WidgetVariable;
}

const WidgetDefaultValueBox: React.FC<WidgetDefaultValueBoxProps> = ({
  widgetVariable: {
    name, description, id, defaultValue,
  },
}) => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  return (
    <Box mt={2}>
      <FormLabel color="gray.300">
        {name}
        {' '}
        -
        {description}
      </FormLabel>
      <Input placeholder="Default Value"
        value={defaultValue}
        onChange={(e) => updateWidgetVariableField(
          'defaultValue',
          setWidgetVariables,
        )(e.target.value, id, widgetVariables)}
      />
    </Box>
  );
};

const StyledError = styled(LiveError)`
  display: block;
  padding: .5rem 2rem;
  background-color: #e72e2e;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.6em;
  font-family: 'Source Code Pro', monospace;
`;

const WidgetPageLeft: React.FC = () => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  const createNewWidgetVariable = () => {
    const newWidgetVariables = JSON.parse(JSON.stringify(widgetVariables));
    newWidgetVariables.push({
      id: Date.now().toString(),
      name: 'new_variable',
      description: '',
      defaultValue: '',
    });
    setWidgetVariables(newWidgetVariables);
  };

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
        {
          widgetVariables.map((widgetVariable) => (
            <WidgetDefaultValueBox widgetVariable={widgetVariable} />
          ))
        }
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
      <WidgetFormGroup title="Edit Widgets">
        {
          widgetVariables.map(
            (widgetVariable) => (
              <WidgetVariableBox
                widgetVariable={widgetVariable}
              />
            ),
          )
        }
        <Button
          variant="outline"
          size="md"
          colorScheme="blue"
          mt={4}
          onClick={() => createNewWidgetVariable()}
        >
          + Add A Variable
        </Button>
      </WidgetFormGroup>

      <WidgetFormGroup title="Editor">
        <Text color="gray.500" mb={4}>
          Edit the code that renders the component.
        </Text>
        {/* Really nasty workaround down here I wish we didn't need
        // @ts-ignore */}
        <LiveEditor onChangeCapture={(e) => {
          // console.log(e.currentTarget?.firstChild.value)
        }}
          style={{ height: '400px', borderRadius: '4px', overflow: 'scroll' }}
        />
        <StyledError />

      </WidgetFormGroup>
    </Box>
  );
};

export default WidgetPageLeft;
