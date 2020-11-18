import React from 'react';
import { useRecoilState } from 'recoil';
import {
  Box, Flex, Input, Text, Textarea, Spacer, Button,
} from '@chakra-ui/react';
import { selectedWidgetState } from '../recoil/atoms';
import { deleteWidgetVariable, updateWidgetVariableField } from '../utils/widget-variables.utils';
import { WidgetVariable } from '../interfaces/widget.interface';

interface WidgetVariableBoxProps {
  widgetVariable: WidgetVariable;
}

const WidgetVariableBox: React.FC<WidgetVariableBoxProps> = ({ widgetVariable: { name, description, id } }) => {
  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);

  if (!selectedWidget) {
    return <Box />;
  }
  return (
    <Box mt={3} p={3} borderWidth="1px" borderRadius="lg">
      <Flex>
        <Text color="gray.700" fontWeight="semibold">
          Variable Name
        </Text>
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
        onChange={(e) => updateWidgetVariableField(
          'name',
          setSelectedWidget,
        )(e.target.value, id, selectedWidget)}
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
          setSelectedWidget,
        )(e.target.value, id, selectedWidget)}
      />
    </Box>
  );
};

export default WidgetVariableBox;
