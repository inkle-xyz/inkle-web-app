import React from 'react';
import { useRecoilState } from 'recoil';
import {
  Box, Flex, Input, Text, Textarea, Spacer, Button,
} from '@chakra-ui/react';
import { WidgetVariable, widgetVariableState } from '../recoil/atoms';
import { deleteWidgetVariable, updateWidgetVariableField } from '../utils/widget-variables.utils';

interface WidgetVariableBoxProps {
  widgetVariable: WidgetVariable;
}

const WidgetVariableBox: React.FC<WidgetVariableBoxProps> = ({ widgetVariable: { name, description, id } }) => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  return (
    <Box mt={3} p={3} borderWidth="1px" borderRadius="lg">
      <Flex>
        <Text color="gray.700" fontWeight="semibold">
          Variable Name
        </Text>
        <Spacer />
        <Button size="xs" colorScheme="red" onClick={() => deleteWidgetVariable(setWidgetVariables)(id, widgetVariables)}>Remove</Button>
      </Flex>
      <Input
        placeholder="variable_name"
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
      <Textarea
        placeholder="Text Description"
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

export default WidgetVariableBox;
