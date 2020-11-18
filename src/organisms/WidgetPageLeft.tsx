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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react';
import React, { ReactText, useEffect, useState } from 'react';
import { FiCopy } from 'react-icons/all';
import { LiveEditor, LiveError } from 'react-live';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import WidgetTitleEditable from '../molecules/WidgetTitleEditable';
import WidgetFormGroup from '../atoms/WidgetFormGroup';
import {
  isWidgetErrorsState,
  originalSelectedWidgetState,
  selectedWidgetState, userState,
  userWidgetCodeState,
} from '../recoil/atoms';
import WidgetVariableSettings from '../molecules/WidgetVariableSettings';
import WidgetVariableValueInput from '../molecules/WidgetVariableValueInput';
import WidgetPageFormLabel from '../atoms/WidgetPageFormLabel';
import { Widget } from '../interfaces/widget.interface';
import { cloneWidget, deleteWidget, saveWidget } from '../services/widget.services';
import { deepEqual } from '../utils/utils';
import { isUsersWidgetState } from '../recoil/selectors';
import { getCurrentUser } from '../services/auth.services';

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

type WidgetPageLeftState = {
  saveButtonLoading: boolean;
  isUnsavedChanges: boolean;
  toastId: ReactText;
  isDeleteModalOpen: boolean;
  hasInitialized: boolean;
}

const WidgetPageLeft: React.FC = () => {
  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);
  const [originalSelectedWidget, setOriginalSelectedWidget] = useRecoilState(originalSelectedWidgetState);
  const [editedCode, setEditedCode] = useRecoilState(userWidgetCodeState);
  const isWidgetErrors = useRecoilValue(isWidgetErrorsState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const linkForNotion = `https://inkle.xyz/w/${selectedWidget?.id}`;
  const { onCopy } = useClipboard(linkForNotion);
  const isUsersWidget = useRecoilValue(isUsersWidgetState);

  const [state, setState] = useState<WidgetPageLeftState>({
    saveButtonLoading: false,
    isUnsavedChanges: false,
    toastId: '',
    isDeleteModalOpen: false,
    hasInitialized: false,
  });

  const history = useHistory();
  const toast = useToast();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

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
    if (isWidgetErrors) {
      toast({
        status: 'error',
        title: 'Errors in widget!',
      });
      return;
    }
    setState((s) => ({
      ...s,
      saveButtonLoading: true,
    }));
    const widgetToSave: Widget = {
      ...selectedWidget,
      code: editedCode,
    };
    try {
      saveWidget(selectedWidget.id, widgetToSave).then(() => {
        toast({
          status: 'success',
          title: 'Saved Widget!',
        });
        setState((s) => ({
          ...s,
          saveButtonLoading: false,
        }));
        toast.close(state.toastId);
        setOriginalSelectedWidget(widgetToSave);
        setSelectedWidget({
          ...selectedWidget,
          code: editedCode,
        });
      });
    } catch (e) {
      toast({
        status: 'error',
        title: 'Error saving widget!',
        description: e.toString(),
      });
      setState((s) => ({
        ...s,
        saveButtonLoading: false,
      }));
    }
  };

  const exitPage = () => {
    setSelectedWidget(null);
    toast.closeAll();
    history.goBack();
  };

  const deleteWidgetClick = () => {
    if (selectedWidget?.id) {
      deleteWidget(selectedWidget.id).then(() => exitPage()).catch((e) => toast({
        status: 'error',
        title: 'Error deleting widget',
        description: e.toString(),
      }));
    }
  };

  const closeModal = () => {
    setState((s) => ({
      ...s,
      isDeleteModalOpen: false,
    }));
  };

  const openModal = () => {
    setState((s) => ({
      ...s,
      isDeleteModalOpen: true,
    }));
  };

  useEffect(() => {
    if (!state.hasInitialized) {
      if (!currentUser) {
        getCurrentUser().then((user) => setCurrentUser(user));
      }
      setState((s) => ({
        ...s,
        hasInitialized: true,
      }));
    }

    // If there are detected changes
    // console.log('editedCode', editedCode !== originalSelectedWidget?.code);
    // console.log('widget', deepEqual(selectedWidget, originalSelectedWidget));
    // console.log('widgetCode', selectedWidget?.code !== originalSelectedWidget?.code);
    if (!deepEqual(selectedWidget, originalSelectedWidget) || editedCode !== originalSelectedWidget?.code) {
      if (state.toastId === '') {
        const t = toast({
          status: 'warning',
          title: 'Unsaved changes',
          duration: null,
        }) as ReactText;
        setState((s) => ({
          ...s,
          toastId: t,
        }));
      }
      setState((s) => ({
        ...s,
        widgetCode: '',
      }));
      setState((s) => ({
        ...s,
        isUnsavedChanges: true,
      }));
    } else {
      setState((s) => ({
        ...s,
        isUnsavedChanges: false,
      })); if (state.toastId !== '') {
        toast.close(state.toastId);
        setState((s) => ({
          ...s,
          toastId: '',
        }));
      }
    }
  }, [setState, originalSelectedWidget, selectedWidget, toast, state.toastId, editedCode]);

  return (
    <Box my="4rem">
      <Flex alignItems="center">
        <IconButton aria-label="Icon button"
          variant="ghost"
          onClick={() => {
            if (state.isUnsavedChanges) {
              // eslint-disable-next-line no-alert
              if (window.confirm('Are you sure you want to exit without saving?')) {
                exitPage();
              }
            } else {
              exitPage();
            }
          }}
          mr={4}
          icon={<ArrowBackIcon w={8} h={8} />}
        />
        <WidgetTitleEditable />
      </Flex>
      {
            isUsersWidget && selectedWidget
              ? (
                <Box>
                  <Flex my={2} alignItems="center">
                    <Button colorScheme="green"
                      onClick={() => onSaveClick()}
                      mr={4}
                      isLoading={state.saveButtonLoading}
                      disabled={!state.isUnsavedChanges}
                    >
                      Save
                    </Button>
                    <Button colorScheme="red"
                      onClick={() => openModal()}
                      mr={4}
                    >
                      Delete
                    </Button>
                    <AlertDialog
                      isOpen={state.isDeleteModalOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={closeModal}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Widget
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure? You cannot undo this action afterwards.
                          </AlertDialogBody>

                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={closeModal}>
                              Cancel
                            </Button>
                            <Button colorScheme="red" onClick={deleteWidgetClick} ml={3}>
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                    <Box mt={2}>
                      <WidgetPageFormLabel>
                        <Tooltip
                          hasArrow
                          label="If you'd like to share this widget with the community.
                          After publishing it, we'll review it and let you know if it's published!"
                          aria-label="A Tooltip"
                        >
                          Published
                        </Tooltip>
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
                        <WidgetVariableValueInput
                          widgetVariable={widgetVariable}
                          key={`default-value ${widgetVariable.id}`}
                        />
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
                        onChange={() => setSelectedWidget({
                          ...selectedWidget,
                          isDarkMode: !selectedWidget.isDarkMode,
                        })}
                      />
                    </Flex>
                  </WidgetFormGroup>
                  <WidgetFormGroup title="Notion Link">
                    <InputGroup mt={4}>
                      <Input
                        type="phone"
                        borderLeftRadius="0"
                        value={linkForNotion}
                        color="black"
                        fontWeight="semibold"
                        isDisabled
                      />
                      <InputRightAddon bgColor="gray.700" color="white" onClick={onCopy}>
                        <FiCopy />
                      </InputRightAddon>
                    </InputGroup>
                  </WidgetFormGroup>

                  <Divider my={5} />

                  <Heading as="h3" size="md" mb={2}>Advanced</Heading>

                  <WidgetFormGroup title="Edit Widgets">
                    {
                    selectedWidget.variables.length !== 0
                      ? selectedWidget.variables.map(
                        (widgetVariable) => (
                          <WidgetVariableSettings
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

                    <LiveEditor onChangeCapture={(e) => {
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      const { currentTarget: { firstChild: { value } } } = e;
                      setEditedCode(value);
                    }}
                      style={{ borderRadius: '4px' }}
                    />

                  </WidgetFormGroup>
                </Box>
              ) : (
                <Box>
                  <Text color="gray.500" fontSize="sm">
                    Made By
                    {' '}
                    {selectedWidget?.authorName}
                  </Text>
                  <Text mt={2}>
                    {selectedWidget?.description}
                  </Text>
                  <Box mt={2} />
                  <Text fontSize="sm" color="gray.500">
                    Actions
                  </Text>
                  <Flex mt={2}>
                    <Button
                      colorScheme="teal"
                      onClick={() => {
                        if (currentUser && selectedWidget) {
                          cloneWidget(currentUser, selectedWidget).then(() => {
                            toast({
                              status: 'success',
                              title: 'Widget cloned!',
                            });
                            history.push('/dashboard');
                          });
                        }
                      }}
                    >
                      Clone
                    </Button>
                  </Flex>
                </Box>
              )
          }
    </Box>

  );
};

export default WidgetPageLeft;
