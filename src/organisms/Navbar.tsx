import {
  Box, Button, Flex, Spacer, Text, Image, Link, MenuButton, Menu, MenuItem, MenuList, Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
  Center,
  ModalFooter,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AiOutlineTwitter } from 'react-icons/all';
import LogoIcon from '../assets/logo-icon.svg';
import { auth } from '../firebase.config';
import { userState } from '../recoil/atoms';
import NavbarContainer from '../atoms/DefaultContainer';
import AuthModal from '../molecules/AuthModal';

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUserState] = useRecoilState(userState);
  const history = useHistory();

  return (
    <NavbarContainer>
      <Flex py={4}>
        <Box>
          <RouterLink to="/">
            <Image src={LogoIcon} />
          </RouterLink>
        </Box>
        <Spacer />
        <Flex alignItems="center" color="gray.600" fontWeight="400">
          {user?.displayName
            ? (
              <>
                <Text mr={4}>
                  Hello,
                  {' '}
                  {user.displayName}
                  {' '}
                  😄
                  {' '}
                </Text>
                <Link as={RouterLink} to="/dashboard" mr={4}>
                  Dashboard
                </Link>
                <Menu>
                  <MenuButton as={Link} mr={4}>Account</MenuButton>
                  <MenuList>
                    <MenuItem onClick={onOpen}>
                      Account Information
                    </MenuItem>
                    <MenuItem onClick={() => {
                      auth.signOut().then(() => {
                        setUserState(null);
                        history.push('/');
                      });
                    }}
                    >
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )
            : <span />}
          <Link as={RouterLink} to="/welcome" mr={4}>
            Tutorial
          </Link>
          <a href="https://twitter.com/inkle_xyz" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="md"
              border="2px solid"
              borderColor="#00ACED"
              color="#00ACED"
              leftIcon={<AiOutlineTwitter />}
            >
              Get Updates
            </Button>
          </a>

        </Flex>

        <AuthModal />

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p="4rem">
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

              <ModalFooter>
                <Button colorScheme="yellow" color="white" mx="auto" size="lg" onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </NavbarContainer>
  );
};

export default Navbar;
