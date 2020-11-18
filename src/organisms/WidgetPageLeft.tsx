/* eslint-disable react/jsx-first-prop-new-line */
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Textarea,
  Text,
  Input,
  Switch,
  Divider,
  InputGroup,
  InputRightAddon,
  Spacer,
  Button,
  IconButton,
  Heading,
  useToast,
} from '@chakra-ui/react';
import React, { ReactText, useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/all';
import { LiveEditor, LiveError } from 'react-live';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';
import { originalSelectedWidgetState, selectedWidgetState } from '../recoil/atoms';
import WidgetVariableBox from '../molecules/WidgetVariableBox';
import WidgetDefaultValueBox from '../molecules/WidgetDefaultValueBox';
import WidgetPageFormLabel from '../atoms/WidgetPageFormLabel';
import { Widget } from '../interfaces/widget.interface';
import { saveWidget } from '../services/widget.services';
import { deepEqual } from '../utils/utils';

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
  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);
  const [originalSelectedWidget, setOriginalSelectedWidget] = useRecoilState(originalSelectedWidgetState);

  const [widgetCode, setWidgetCode] = useState('');
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);

  const [toastId, setToastId] = useState<ReactText>('');

  const history = useHistory();
  const toast = useToast();

  const createNewWidgetVariable = () => {
    if (selectedWidget) {
      const newWidgetVariables = JSON.parse(JSON.stringify(selectedWidget.variables));
      newWidgetVariables.push({
        id: Date.now().toString(),
        name: 'new_variable',
        description: '',
        value: '',
      });
      setSelectedWidget({ ...selectedWidget, variables: newWidgetVariables });
    }
  };

  const onSaveClick = () => {
    if (!selectedWidget) {
      toast({
        status: 'error',
        title: 'No Selected Widget!',
      });
      return;
    }
    setSaveButtonLoading(true);
    const widgetToSave: Widget = {
      ...selectedWidget,
      code: widgetCode !== '' ? widgetCode : selectedWidget.code,
    };
    try {
      saveWidget(selectedWidget.id, widgetToSave).then(() => {
        toast({
          status: 'success',
          title: 'Saved Widget!',
        });
        setSaveButtonLoading(false);
        toast.close(toastId);
        setOriginalSelectedWidget(widgetToSave);
      });
    } catch (e) {
      toast({
        status: 'error',
        title: 'Error saving widget!',
        description: e.toString(),
      });
      setSaveButtonLoading(false);
    }
  };

  useEffect(() => {
    if (!deepEqual(selectedWidget, originalSelectedWidget)) {
      if (toastId === '') {
        const t = toast({
          status: 'warning',
          title: 'Unsaved changes',
          duration: null,
        }) as ReactText;
        setToastId(t);
      }
      setIsUnsavedChanges(true);
    } else {
      setIsUnsavedChanges(false);
      if (toastId !== '') {
        toast.close(toastId);
        setToastId('');
      }
    }
  });

  return (
    selectedWidget
      ? (
        <Box my="4rem">
          <Flex alignItems="center">
            <IconButton aria-label="Icon button"
              variant="ghost"
              onClick={() => {
                if (isUnsavedChanges) {
                  // eslint-disable-next-line no-alert
                  if (window.confirm('Are you sure you want to exit without saving?')) {
                    setSelectedWidget(null);
                    history.goBack();
                  }
                } else {
                  setSelectedWidget(null);
                  history.goBack();
                }
              }}
              mr={4}
              icon={<ArrowBackIcon w={8} h={8} />}
            />
            <WidgetTitleEditable />
          </Flex>

          <Flex my={2} alignItems="center">
            <Button colorScheme="green"
              onClick={() => onSaveClick()}
              mr={4}
              isLoading={saveButtonLoading}
              disabled={!isUnsavedChanges}
            >
              Save
            </Button>
            <Box mt={2}>
              <WidgetPageFormLabel>
                Published
              </WidgetPageFormLabel>
            </Box>
            <Switch id="isPublished"
              mt={1}
              isChecked={selectedWidget.isPublished}
              onChange={() => {
                setSelectedWidget(
                  { ...selectedWidget, isPublished: !selectedWidget.isPublished },
                );
              }}
            />
          </Flex>

          <Box>
            <WidgetPageFormLabel>
              Description
            </WidgetPageFormLabel>
            <Textarea placeholder="Widget description"
              id="widget-description"
              value={selectedWidget?.description}
              onChange={(e) => setSelectedWidget({ ...selectedWidget, description: e.target.value })}
            />
          </Box>

          <WidgetFormGroup title="Data">
            {
          selectedWidget.variables.length !== 0
            ? selectedWidget.variables.map((widgetVariable) => (
              <WidgetDefaultValueBox widgetVariable={widgetVariable} key={`default-value ${widgetVariable.id}`} />
            )) : <Text mt={2} color="gray.500">No Variables</Text>
        }
          </WidgetFormGroup>
          <WidgetFormGroup title="Style">
            <Flex mt={4} w="100%">
              <WidgetPageFormLabel>
                Dark Mode
              </WidgetPageFormLabel>
              <Spacer />
              <Switch id="dark-mode"
                mt={1}
                isChecked={selectedWidget.isDarkMode}
                onChange={() => setSelectedWidget({ ...selectedWidget, isDarkMode: !selectedWidget.isDarkMode })}
              />
            </Flex>
          </WidgetFormGroup>
          <WidgetFormGroup title="Notion Link">
            <InputGroup mt={4}>
              <Input
                type="phone"
                borderLeftRadius="0"
                value="test.link.here"
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

          <Heading as="h3" size="md" mb={2}>Customize</Heading>

          <WidgetFormGroup title="Edit Widgets">
            {
              selectedWidget.variables.length !== 0
                ? selectedWidget.variables.map(
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
            <StyledError />
            {/* Really nasty workaround down here I wish we didn't need
        // @ts-ignore */}
            <LiveEditor onChangeCapture={(e) => setWidgetCode(e.currentTarget?.firstChild.value)}
              style={{ borderRadius: '4px' }}
            />

          </WidgetFormGroup>
        </Box>
      ) : <Box />
  );
};

export default WidgetPageLeft;
