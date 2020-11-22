import React from 'react';
import {
  Button,
  Center,
  Container, Heading, Text, Box, Image, Link, SimpleGrid,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Link as BrowserLink } from 'react-router-dom';
import GoogleColorIcon from '../atoms/GoogleColorIcon';
import HomeCallout from '../organisms/HomeCallout';
import { signupWidgetState, userState } from '../recoil/atoms';
import CommunityWidgets from '../organisms/CommunityWidgets';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import EditorImage from '../assets/editor.png';
import AnnouncementBanner from '../organisms/AnnouncementBanner';

const HomePage: React.FC = () => {
  const setSignupWidgetState = useSetRecoilState(signupWidgetState);
  const user = useRecoilValue(userState);

  return (
    <Box>
      <AnnouncementBanner />
      <Navbar />

      <Container maxW="1200px" px="4rem" mt="5rem" w="100%">
        <SimpleGrid columns={{ base: 1, md: 2 }}>
          <Center>
            <Box>
              <Heading
                color="gray.700"
                size="xl"
                as="h1"
                textAlign={['center', 'center', 'left']}
                lineHeight={{ base: '40px', md: '56px' }}
              >
                Beautify Your Notion
                <br />
                With Custom Widgets
              </Heading>
              <Text
                mt="2rem"
                textAlign={['center', 'center', 'left']}
                fontSize="xl"
              >
                Discover, create, and customize beautiful Notion widgets
              </Text>
              {/* eslint-disable max-len */}
              <Link
                href="https://www.producthunt.com/posts/inkle?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-inkle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  mx={{ base: 'auto', md: '0' }}
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=275451&theme=light"
                  alt="Inkle - Discover, create, and customize beautiful Notion widgets | Product Hunt"
                  mt={4}
                  width="200px"
                  height="54px"
                />
              </Link>
              <Box
                mt={5}
                textAlign={['center', 'center', 'left']}
              >
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
                    ) : <BrowserLink to="/dashboard"><Button>Go to Dashboard</Button></BrowserLink>
                }
              </Box>
            </Box>
          </Center>
          <Box>
            <Center mt="4rem">
              <Box textAlign="center">
                <Image src={EditorImage} boxShadow="lg" />
                <Text mt={2} color="gray.400">Fully Fledged Widget Editor</Text>
              </Box>
            </Center>
          </Box>
        </SimpleGrid>
        <CommunityWidgets forHome />
      </Container>
      <HomeCallout onSignUpClick={() => setSignupWidgetState(true)} user={user} />

      <Footer />

    </Box>
  );
};

export default HomePage;
