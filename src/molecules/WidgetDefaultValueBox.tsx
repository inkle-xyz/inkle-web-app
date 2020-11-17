import React from 'react';
import { useRecoilState } from 'recoil';
import { Box, FormLabel, Input } from '@chakra-ui/react';
import { WidgetVariable, widgetVariableState } from '../recoil/atoms';
import { updateWidgetVariableField } from '../utils/widget-variables.utils';

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
      <Input
        placeholder="Default Value"
        value={defaultValue}
        onChange={(e) => updateWidgetVariableField(
          'defaultValue',
          setWidgetVariables,
        )(e.target.value, id, widgetVariables)}
      />
    </Box>
  );
};

export default WidgetDefaultValueBox;
