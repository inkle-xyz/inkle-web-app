/* eslint-disable react/jsx-first-prop-new-line */
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box, Flex, FormLabel, Textarea, Text, Input, Switch, Divider, InputGroup, InputRightAddon, Spacer, Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiCopy } from 'react-icons/all';
import { LiveEditor, LiveError } from 'react-live';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';
import { widgetSettingsState, widgetVariableState } from '../recoil/atoms';
import WidgetVariableBox from '../molecules/WidgetVariableBox';
import WidgetDefaultValueBox from '../molecules/WidgetDefaultValueBox';

const StyledError = styled(LiveError)`
  display: block;
  padding: .5rem;
  background-color: #ef4949;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.6em;
  font-family: 'Source Code Pro', monospace;
`;

const WidgetPageLeft: React.FC = () => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);
  const [widgetSettings, setWidgetSettings] = useRecoilState(widgetSettingsState);
  const history = useHistory();

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
        <ArrowBackIcon w={8} h={8} mr={4} onClick={() => history.goBack()} />
        <WidgetTitleEditable />
      </Flex>

      <Box>
        <FormLabel color="gray.300">
          Description
        </FormLabel>
        <Textarea placeholder="Widget description"
          value={widgetSettings.description}
          onChange={(e) => setWidgetSettings({ ...widgetSettings, description: e.target.value })}
        />
      </Box>

      <WidgetFormGroup title="Data">
        {
          widgetVariables.length !== 0
            ? widgetVariables.map((widgetVariable) => (
              <WidgetDefaultValueBox widgetVariable={widgetVariable} key={`default-value ${widgetVariable.id}`} />
            )) : <Text mt={2} color="gray.500">No Variables</Text>
        }
      </WidgetFormGroup>
      <WidgetFormGroup title="Style">
        <Flex mt={4} w="100%">
          <FormLabel color="gray.500" htmlFor="dark-mode">
            Dark Mode
          </FormLabel>
          <Spacer />
          <Switch id="dark-mode"
            mt={1}
            defaultChecked={widgetSettings.isDarkMode}
            onChange={() => setWidgetSettings({ ...widgetSettings, isDarkMode: !widgetSettings.isDarkMode })}
          />
        </Flex>
      </WidgetFormGroup>
      <WidgetFormGroup title="Notion Link">
        <InputGroup mt={4}>
          <Input
            type="phone"
            borderLeftRadius="0"
            value={widgetSettings.deployedLink}
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
          widgetVariables.length !== 0
            ? widgetVariables.map(
              (widgetVariable) => (
                <WidgetVariableBox
                  key={`widget-variable-box-${widgetVariable.id}`}
                  widgetVariable={widgetVariable}
                />
              ),
            ) : <Text mt={2} color="gray.500">No Variables</Text>
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
        <LiveEditor onChangeCapture={() => {
          // console.log(e.currentTarget?.firstChild.value)
        }}
          style={{ borderRadius: '4px' }}
        />
        <StyledError />

      </WidgetFormGroup>
    </Box>
  );
};

export default WidgetPageLeft;
