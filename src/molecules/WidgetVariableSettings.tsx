import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Box, Flex, Input, Text, Textarea, Spacer, Button, FormLabel,
} from '@chakra-ui/react';
import { isWidgetErrorsState, selectedWidgetState } from '../recoil/atoms';
import { deleteWidgetVariable, updateWidgetVariableField } from '../utils/widget.utils';
import { WidgetVariable } from '../interfaces/widget.interface';

interface Props {
  widgetVariable: WidgetVariable;
}

const WidgetVariableSettings: React.FC<Props> = ({ widgetVariable: { name, description, id } }) => {
  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);
  const [variableError, setVariableError] = useState<undefined | string>(undefined);
  const setIsWidgetErrors = useSetRecoilState(isWidgetErrorsState);

  if (!selectedWidget) {
    return <Box />;
  }

  const validateVariableName = (value: string) => {
    if (value === '' || !value) {
      setVariableError('Variable name is required');
      setIsWidgetErrors(true);
    } else if (value.indexOf(' ') >= 0) {
      setVariableError('No spaces allowed!');
      setIsWidgetErrors(true);
    } else if (/\d/.test(value)) {
      setVariableError('No numbers allowed in variable name!');
      setIsWidgetErrors(true);
    } else if (variableError) {
      setVariableError(undefined);
      setIsWidgetErrors(false);
    }
  };

  const onVariableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateVariableName(e.target.value);
    updateWidgetVariableField(
      'name',
      setSelectedWidget,
    )(e.target.value, id, selectedWidget);
  };

  return (
    <Box mt={3} p={3} borderWidth="1px" borderRadius="lg">
      <Flex>
        <FormLabel color="gray.700" fontWeight="semibold">
          Variable Name
        </FormLabel>
        <Spacer />
        <Button
          size="xs"
          colorScheme="red"
          onClick={() => deleteWidgetVariable(setSelectedWidget)(id, selectedWidget)}
        >
          Remove
        </Button>
      </Flex>
      <Input
        placeholder="variable_name"
        value={name}
        mt={2}
        onChange={onVariableNameChange}
      />
      <Text color="red.600" mt={1}>
        { variableError}
      </Text>

      <Text mt={3} color="gray.700" fontWeight="semibold">
        Description
      </Text>
      <Textarea
        placeholder="Text Description"
        value={description}
        mt={2}
        onChange={(e) => updateWidgetVariableField(
          'description',
          setSelectedWidget,
        )(e.target.value, id, selectedWidget)}
      />
    </Box>
  );
};

export default WidgetVariableSettings;
