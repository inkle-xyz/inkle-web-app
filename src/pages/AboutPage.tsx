import React from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import AnnouncementBanner from '../organisms/AnnouncementBanner';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

const AboutPage: React.FC = () => (
  <>
    <AnnouncementBanner />
    <Navbar />
    <Container px={{ base: 0, md: '4rem' }} my="5rem" w="100%">
      <Heading size="xl" color="gray.700">
        About
      </Heading>
      <Text mt={2} lineHeight="170%">
        {/* eslint-disable react/no-unescaped-entities */}
        It's a pleasure to meet you.
        My name is Caelin, and I'm a freshmen at UC Berkeley studying EECS and Business.
        I'm a pretty avid user of Notion, in my academic and professional life,
        I've found it one of the best tools to manage my work and organize my ideas.
        Inkle was born out of a desire to have more customization within my Notion,
        a curiosity for what we can accomplish with widgets,
        and a five day caffeine-fueled hackathon.
        This product is completely free and I plan to keep it completely free,
        because I want to empower the Notion community.
        Interested in our tech? Send me a message and I'll grant you access to the code!
        I'm driven to create a product that Notion users loves to use as much as I do and
        I'm excited to see what the community creates with Inkle!
      </Text>
      <Text lineHeight="170%" mt={2}>
        If there's anything that I can do to make this product better for you, please let me know.
        You can reach me via email at hello@inkle.xyz
      </Text>

    </Container>
    <Footer />
  </>
);

export default AboutPage;
