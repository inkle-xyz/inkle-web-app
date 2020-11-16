import {
  Box, Button, Flex, Spacer, Text, Image, Link,
} from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LogoIcon from '../assets/logo-icon.svg';

const Navbar: React.FC = () => (
  <Flex py={2}>
    <Box>
      <Image src={LogoIcon} />
    </Box>
    <Spacer />
    <Flex alignItems="center">
      <Text mr={4}>Hello, Caelin 😄 </Text>
      <Link as={RouterLink} to="/account" mr={4}>Account</Link>
      <Button variant="outline" size="sm">Get Updates</Button>
    </Flex>
  </Flex>
);

export default Navbar;
