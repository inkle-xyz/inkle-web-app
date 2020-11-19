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
import { analytics } from '../firebase.config';

type Props = {
  id: string;
}

const WidgetForNotionPage: React.FC<Props> = ({ id }) => {
  const [widget, setWidget] = useState<Widget>();

  useEffect(() => {
    getWidget(id).then((w) => {
      setWidget(w);
      analytics.logEvent(`view_widget_${w.id}_${w.name}`);
    });
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
          <LiveProvider
            code={widget.code}
            scope={{
              ...getScopeFromWidget(widget),
              styled,
              isDarkMode: widget.isDarkMode,
              authorName: widget.authorName,
            }}
          >
            <LivePreview />
          </LiveProvider>
        </Box>

      ) : <Box />
  );
};

export default WidgetForNotionPage;
