import { Box, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  LiveProvider,
  LivePreview,
} from 'react-live';
import { Widget } from '../interfaces/widget.interface';
import { getWidget } from '../services/widget.services';
import { getScopeFromWidget } from '../utils/widget.utils';

type Props = {
  id: string;
}

const WidgetForNotionPage: React.FC<Props> = ({ id }) => {
  const [widget, setWidget] = useState<Widget>();

  useEffect(() => {
    getWidget(id).then((w) => setWidget(w));
  }, []);

  return (
    widget
      ? (
        <LiveProvider code={widget.code} scope={getScopeFromWidget(widget)}>
          <Box bgColor="white" w="365px" h="365px">
            <Center h="100%">
              <LivePreview />
            </Center>
          </Box>
        </LiveProvider>

      ) : <Box />
  );
};

export default WidgetForNotionPage;
