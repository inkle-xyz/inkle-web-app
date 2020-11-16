import {
  ButtonGroup, Editable, EditableInput, EditablePreview, Flex, IconButton,
} from '@chakra-ui/react';
import React from 'react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

const WidgetTitleEditable: React.FC = () => {
  function EditableControls({
    isEditing, onSubmit, onCancel, onEdit, ...props
  }: any) {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" {...props}>
        <IconButton colorScheme="green" icon={<CheckIcon />} onClick={onSubmit} aria-label="Confirm" />
        <IconButton colorScheme="red" icon={<CloseIcon />} onClick={onCancel} aria-label="Cancel" />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" {...props}>
        <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} aria-label="Edit" />
      </Flex>
    );
  }

  return (
    <Editable
      defaultValue="Widget Name"
      fontSize="3xl"
      fontWeight="bold"
      mb={2}
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <Flex alignItems="center">
          <EditablePreview />
          <EditableInput />
          <EditableControls {...props} ml={3} mt={1} />
        </Flex>
      )}
    </Editable>
  );
};

export default WidgetTitleEditable;
