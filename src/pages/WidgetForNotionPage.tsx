import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  LiveProvider,
  LivePreview,
} from 'react-live';
import styled from '@emotion/styled';
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
    // eslint-disable-next-line
  }, []);

  return (
    widget
      ? (
        <Box
          bgColor={
            widget.isDarkMode
              ? '#2F3437' : 'white'
          }
          color={
            widget.isDarkMode
              ? 'white' : 'gray.800'
          }
          h="100vh"
          w="100vw"
        >
          <LiveProvider code={widget.code} scope={{ ...getScopeFromWidget(widget), styled }}>
            <LivePreview />
          </LiveProvider>
        </Box>

      ) : <Box />
  );
};

export default WidgetForNotionPage;
