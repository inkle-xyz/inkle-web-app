import React from 'react';
import {
  Box, Center, Flex, Heading, Link,
} from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';
import DefaultContainer from '../atoms/DefaultContainer';

const Footer: React.FC = () => (
  <Box w="100%" bgColor="gray.800" color="white">
    <DefaultContainer maxW="1000px">
      <Flex display={{ base: 'block', md: 'flex' }} py="3rem" textAlign="center" w="100%">
        <Center w="100%">
          <Box>
            <Heading>
              Inkle
            </Heading>
            <Flex justifyContent="center" mt={3}>
              <Link mx={3} as={BrowserLink} to="/">
                Home
              </Link>
              <Link mx={3} as={BrowserLink} to="/">
                Tutorial
              </Link>
              <Link
                mx={3}
                href="https://www.notion.so/caelinsutch/Inkle-TOS-dd2fab9843bd407498c003e824bb9a9a"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>
              <Link
                mx={3}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.notion.so/caelinsutch/Inkle-Privacy-policy-59a05f84b2fa489381b1ba1a1a903b7c"
              >
                Privacy Policy
              </Link>
            </Flex>
            <Flex justifyContent="center" mt={2}>
              <Link
                as={BrowserLink}
                mx={3}
                to="/about"
              >
                About
              </Link>
              <Link
                mx={3}
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:hello@inkle.xyz"
              >
                hello@inkle.xyz
              </Link>
              <Link
                mx={3}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/inkle-xyz/Public-Tracker/issues"
              >
                Feature Request
              </Link>
            </Flex>
          </Box>
        </Center>
      </Flex>
    </DefaultContainer>
  </Box>
);
export default Footer;
