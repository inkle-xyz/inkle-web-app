import React from 'react';
import {
  Box, Button, Flex, Heading, Text,
} from '@chakra-ui/react';
import NavbarContainer from '../atoms/DefaultContainer';

const SectionCallout: React.FC = () => (
  <Box w="100%" bgColor="gray.100">
    <NavbarContainer>
      <Box py="4rem">
        <Heading color="gray.700">
          Suggestions or Improvements?
        </Heading>
        <Text color="gray.600" fontSize="lg" mt="2rem">
          We want to hear your suggestions and feedback!
        </Text>
        <Flex mt="2rem">
          <a href="https://twitter.com/inkle_xyz" target="_blank" rel="noopener noreferrer">

            <Button
              bgColor="gray.700"
              color="white"
              _hover={{
                bgColor: 'gray.900',
              }}
              mr={3}
            >
              Follow our Twitter
            </Button>
          </a>
          <a href="https://github.com/inkle-xyz/Public-Tracker/issues" target="_blank" rel="noopener noreferrer">

            <Button
              bgColor="gray.700"
              color="white"
              _hover={{
                bgColor: 'gray.900',
              }}
            >
              Suggest a Feature
            </Button>
          </a>
        </Flex>
      </Box>
    </NavbarContainer>
  </Box>
);

export default SectionCallout;
