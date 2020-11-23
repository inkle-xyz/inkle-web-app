import {
  Box, Flex, Spacer, Image, Link, MenuButton, Menu, MenuItem, MenuList, Container, Icon,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AiOutlineTwitter } from 'react-icons/all';
import LogoIcon from '../assets/logo-icon.svg';
import LogoHorizontal from '../assets/logo-horizontal.svg';
import { auth } from '../firebase.config';
import { userState } from '../recoil/atoms';
import AuthModal from '../molecules/AuthModal';

const Navbar: React.FC = () => {
  const [user, setUserState] = useRecoilState(userState);
  const history = useHistory();

  return (
    <Container maxW="1440px" px={{ base: '0', md: '4rem' }}>
      <Flex py={4} overflowY="auto">
        <Box display={{ base: 'none', md: 'block' }}>
          <RouterLink to="/">
            <Image src={LogoHorizontal} w="150px" />
          </RouterLink>
        </Box>
        <Spacer display={{ base: 'none', md: 'block' }} />
        <Flex alignItems="center" color="gray.600" fontWeight="400" px={{ base: '1rem', md: 0 }}>
          <Link as={RouterLink} to="/" w="50px" mr={2} display={{ base: 'block', md: 'none' }}>
            <Image src={LogoIcon} />
          </Link>
          {user?.displayName
            ? (
              <>
                <Link as={RouterLink} to="/dashboard" mr={4}>
                  Dashboard
                </Link>
                <Menu>
                  <MenuButton as={Link} mr={4}>Account</MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link as={RouterLink} to="/account">
                        Account Information
                      </Link>
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
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.notion.so/caelinsutch/Hey-There-e1f6b9bffc404c8083a20618a591d8e3"
            mr={4}
          >
            About
          </Link>
          <a href="https://twitter.com/inkle_xyz" target="_blank" rel="noopener noreferrer">
            <Icon as={AiOutlineTwitter} color="gray.400" />
          </a>

        </Flex>

        <AuthModal />
      </Flex>
    </Container>
  );
};

export default Navbar;
