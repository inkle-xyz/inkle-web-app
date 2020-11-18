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
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LogoIcon from '../assets/logo-icon.svg';
import { auth } from '../firebase.config';
import { getCurrentUser } from '../services/auth.services';
import { User } from '../interfaces/user.interface';

const DashboardNavbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState<{ user: User | undefined}>({
    user: undefined,
  });

  useEffect(() => {
    getCurrentUser().then((user) => setState({
      user,
    }));
  }, []);

  return (
    <Flex py={2}>
      <Box>
        <RouterLink to="/">
          <Image src={LogoIcon} />
        </RouterLink>
      </Box>
      <Spacer />
      <Flex alignItems="center">
        <Text mr={4}>
          Hello,
          {' '}
          {state?.user?.displayName}
          {' '}
          😄
          {' '}
        </Text>
        <Menu>
          <MenuButton as={Link} mr={4}>Account</MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>
              Account Information
            </MenuItem>
            <MenuItem onClick={() => auth.signOut()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
        <Button variant="outline" size="sm">Get Updates</Button>
      </Flex>

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
              {state?.user?.email}
            </Text>

            <Heading size="md" color="gray.700" mt={3}>
              Account Since
            </Heading>
            <Text>
              {state?.user?.createdAt}
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
  );
};

export default DashboardNavbar;