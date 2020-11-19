import React from 'react';
import {
  Button,
  Center,
  Container, Flex, Heading, Text, Box,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import GoogleColorIcon from '../atoms/GoogleColorIcon';
import HomeCallout from '../organisms/HomeCallout';
import { signupWidgetState, userState } from '../recoil/atoms';

const HomePage: React.FC = () => {
  const setSignupWidgetState = useSetRecoilState(signupWidgetState);
  const user = useRecoilValue(userState);

  return (
    <Box>
      <Container maxW="800px" px="4rem" mt="5rem" w="100%">
        <Heading color="gray.700" size="xl" as="h1" textAlign="center" lineHeight="56px">
          Beautify your Notion
          <br />
          With Custom Widgets
        </Heading>
        <Text mt="2rem" textAlign="center" fontSize="xl">
          Discover, create, and customize beautiful Notion widgets
        </Text>
        <Center>
          <Flex mt={5} textAlign="center" alignItems="center">
            {
              !user
                ? (
                  <>
                    <Text
                      fontWeight="bold"
                      color="gray.500"
                      mr={4}
                    >
                      Sign up with
                    </Text>
                    <Button
                      leftIcon={<GoogleColorIcon />}
                      onClick={() => setSignupWidgetState(true)}
                    >
                      Google
                    </Button>
                  </>
                ) : <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
            }
          </Flex>
        </Center>
        <Heading color="gray.500" size="md" as="h2" textAlign="center" lineHeight="56px" mt="5rem">
          Some Awesome Widgets Created on Our Platform
        </Heading>
      </Container>
      <HomeCallout onSignUpClick={() => setSignupWidgetState(true)} isUser={typeof user !== 'undefined'} />

    </Box>
  );
};

export default HomePage;
