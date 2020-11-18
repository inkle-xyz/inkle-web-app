import React from 'react';
import { useRecoilState } from 'recoil';
import { Box, Input } from '@chakra-ui/react';
import { selectedWidgetState } from '../recoil/atoms';
import { updateWidgetVariableField } from '../utils/widget-variables.utils';
import { WidgetVariable } from '../interfaces/widget.interface';
import WidgetPageFormLabel from '../atoms/WidgetPageFormLabel';

interface WidgetDefaultValueBoxProps {
  widgetVariable: WidgetVariable;
}

const WidgetDefaultValueBox: React.FC<WidgetDefaultValueBoxProps> = ({
  widgetVariable: {
    name, description, id, value,
  },
}) => {
  const [selectedWidget, setSelectedWidget] = useRecoilState(selectedWidgetState);

  if (!selectedWidget) {
    return <Box />;
  }
  return (
    <Box mt={2}>
      <WidgetPageFormLabel>
        {name}
        {' '}
        -
        {description}
      </WidgetPageFormLabel>
      <Input
        placeholder="Value"
        value={value}
        onChange={(e) => updateWidgetVariableField(
          'value',
          setSelectedWidget,
        )(e.target.value, id, selectedWidget)}
      />
    </Box>
  );
};

export default WidgetDefaultValueBox;
