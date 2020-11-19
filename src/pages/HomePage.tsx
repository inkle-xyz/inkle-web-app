import React from 'react';
import {
  Button,
  Center,
  Container, Flex, Heading, Text, Box, Image, SimpleGrid,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import GoogleColorIcon from '../atoms/GoogleColorIcon';
import HomeCallout from '../organisms/HomeCallout';
import { signupWidgetState, userState } from '../recoil/atoms';
import Clock from '../assets/clock.jpg';
import LifeProgress from '../assets/life-progress.jpg';
import Quotes from '../assets/quotes.jpg';
import CommunityWidgets from '../organisms/CommunityWidgets';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const HomePage: React.FC = () => {
  const setSignupWidgetState = useSetRecoilState(signupWidgetState);
  const user = useRecoilValue(userState);

  return (
    <Box>
      <Navbar />

      <Container maxW="800px" px="4rem" mt="5rem" w="100%">
        <Heading color="gray.700" size="xl" as="h1" textAlign="center" lineHeight={{ base: '40px', md: '56px' }}>
          Beautify Your Notion
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
        <Heading
          color="gray.500"
          size="md"
          as="h2"
          textAlign="center"
          lineHeight={{ base: '40px', md: '56px' }}
          mt="5rem"
        >
          Some Awesome Widgets Created on Our Platform
        </Heading>
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} my={10}>
          <Box textAlign="center">
            <Image src={Clock} boxShadow="md" />
            <Text mt={2} color="gray.400">Simple Clock</Text>
          </Box>
          <Box textAlign="center">
            <Image src={LifeProgress} boxShadow="md" />
            <Text mt={2} color="gray.400">Life Tracker</Text>
          </Box>
          <Box textAlign="center">
            <Image src={Quotes} boxShadow="md" />
            <Text mt={2} color="gray.400">Quote of the Day</Text>
          </Box>
        </SimpleGrid>
        <CommunityWidgets forHome />
      </Container>
      <HomeCallout onSignUpClick={() => setSignupWidgetState(true)} isUser={typeof user !== 'undefined'} />

      <Footer />

    </Box>
  );
};

export default HomePage;
