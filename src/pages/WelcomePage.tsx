import React from 'react';
import {
  Button, Container, Heading,
} from '@chakra-ui/react';

import step1 from '../assets/step-1.gif';
import step2 from '../assets/step-2.gif';
import step3 from '../assets/step-3.gif';
import Navbar from '../organisms/Navbar';

const WelcomePage = () => (
  <>
    <Navbar />
    <Container maxW="800px" px="4rem" mt="5rem">
      <Heading color="gray.700" size="xl" as="h1">
        Welcome!
        {' '}
        <span role="img" aria-label="Happy Face Emoji">😃</span>
      </Heading>
      <Heading as="h2" color="gray.500" size="md" fontWeight="normal" mt={4}>
        A quick tutorial on how to get started.
      </Heading>

      <Heading as="h2" color="gray.700" size="md" fontWeight="bold" mt="3rem">
        Copy a Community Widget or create a new one
      </Heading>
      <img
        src={step1}
        alt="Step 1"
      />

      <Heading as="h2" color="gray.700" size="md" fontWeight="bold" mt="3rem">
        Setup the widget and copy the Notion URL
      </Heading>
      <img
        src={step2}
        alt="Step 2"
      />

      <Heading as="h2" color="gray.700" size="md" fontWeight="bold" mt="3rem">
        Paste the URL into notion and choose create embed
      </Heading>
      <img
        src={step3}
        alt="Step 3"
      />
      <Heading as="h2" color="gray.700" size="md" fontWeight="bold" mt="3rem">
        Questions? Let us know!
      </Heading>
      <p>Click below or email us at hello@inkle.xyz</p>
      <a href="mailto:hello@inkle.xyz" target="_blank" rel="noopener noreferrer">
        <Button
          my={3}
          colorScheme="teal"
          mx="auto"
        >
          Contact Us
        </Button>
      </a>
    </Container>
  </>

);

export default WelcomePage;
