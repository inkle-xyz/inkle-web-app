import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  Box, Center, Container, Heading, Text,
} from '@chakra-ui/react';
import { userState } from '../recoil/atoms';
import { getCurrentUser } from '../services/auth.services';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import AnnouncementBanner from '../organisms/AnnouncementBanner';

const AccountPage:React.FC = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    getCurrentUser().then((newUser) => (newUser ? setUser(newUser) : null));
  }, [setUser]);

  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <Container px={{ base: '0', md: '4rem' }} my="4rem">
        <Box>
          <Center mb="3rem">
            <Heading size="xl" color="gray.700">
              Account Information
            </Heading>
          </Center>
          <Heading size="md" color="gray.700" mt={1}>
            Email
          </Heading>
          <Text>
            {user?.email}
          </Text>

          <Heading size="md" color="gray.700" mt={3}>
            Account Since
          </Heading>
          <Text>
            {user?.createdAt}
          </Text>

          <Heading size="md" color="gray.700" mt={3}>
            Delete Account
          </Heading>
          <Text>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Please email hello@inkle.xyz if you'd like to delete your account.
          </Text>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AccountPage;
