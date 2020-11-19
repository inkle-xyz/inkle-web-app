import React from 'react';
import {
  Box, Heading, Text, Button, Spacer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import DefaultContainer from '../atoms/DefaultContainer';

type Props = {
  onSignUpClick: () => void;
  isUser: boolean;
}

const HomeCallout: React.FC<Props> = ({ onSignUpClick, isUser }) => (
  <Box w="100%" bgColor="gray.100">
    <DefaultContainer maxW="1000px">
      <Box display={{ base: 'block', md: 'flex' }} alignItems="center" py="4rem">
        <Box
          pb={{ base: '1rem', md: '0' }}
        >
          <Heading color="gray.700" size="md">
            Ready to make your Notion awesome?
            {' '}
            <span role="img" aria-label="Happy Face Emoji">✨</span>
          </Heading>
          <Text color="gray.600" fontSize="lg" mt={{ base: '1rem', md: '2rem' }}>
            Create your free account today.
          </Text>
        </Box>
        <Spacer display={{ base: 'none', md: 'block' }} />
        <Box>
          <Button
            bgColor="yellow.400"
            color="white"
            _hover={{
              bgColor: 'yellow.500',
            }}
            onClick={() => {
              if (!isUser) {
                onSignUpClick();
              }
            }}
          >
            {
              !isUser
                ? <Link to="/dashboard">Go to Dashboard</Link> : (
                  'Sign Up Today'
                )
            }
          </Button>

        </Box>
      </Box>
    </DefaultContainer>
  </Box>
);

export default HomeCallout;
