import React from 'react';
import { useRecoilState } from 'recoil';
import { Box, Input } from '@chakra-ui/react';
import { widgetVariableState } from '../recoil/atoms';
import { updateWidgetVariableField } from '../utils/widget-variables.utils';
import { WidgetVariableState } from '../interfaces/widget.interface';
import WidgetPageFormLabel from '../atoms/WidgetPageFormLabel';

interface WidgetDefaultValueBoxProps {
  widgetVariable: WidgetVariableState;
}

const WidgetDefaultValueBox: React.FC<WidgetDefaultValueBoxProps> = ({
  widgetVariable: {
    name, description, id, defaultValue,
  },
}) => {
  const [widgetVariables, setWidgetVariables] = useRecoilState(widgetVariableState);

  return (
    <Box mt={2}>
      <WidgetPageFormLabel>
        {name}
        {' '}
        -
        {description}
      </WidgetPageFormLabel>
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
