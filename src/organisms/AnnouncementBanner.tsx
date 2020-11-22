import {
  Box, Center, Heading, Link,
} from '@chakra-ui/react';
import React from 'react';

const AnnouncementBanner: React.FC = () => (
  <Box w="100%" bgColor="gray.100">
    <Box maxWidth="800px" px="4rem" py="1rem" mx="auto">
      <Center>
        <Heading size="xs" textAlign="center">
          <span role="img" aria-label="Lightbulb Emoji">💡</span>
          {' '}
          Looking for some more Notion inspiration?
          {' '}
          <Link
            href="https://resources.inkle.xyz"
            target="_blank"
            rel="noopener noreferrer"
            textDecoration="underline"
          >
            Check out our list of top Notion templates!
          </Link>
        </Heading>
      </Center>
    </Box>
  </Box>
);

export default AnnouncementBanner;
