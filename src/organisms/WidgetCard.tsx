import {
  Box, Flex, Heading, Icon, Image, Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineLike, IoIosStats } from 'react-icons/all';

const WidgetCard: React.FC = () => (
  <Box borderRadius="lg" boxShadow="lg" overflow="hidden">
    <Image src="https://bit.ly/2Z4KKcF" />
    <Box p={6}>
      <Heading
        mt="1"
        fontWeight="bold"
        as="h4"
        lineHeight="tight"
        isTruncated
        size="md"
      >
        Widget Name
      </Heading>
      <Text mt={2} fontSize="sm">
        Widget description goes here. If it’s too long it gets appended to a shorter length with the generic
      </Text>
      <Flex mt={5} justify="space-between">
        <Flex>
          <Flex alignItems="center">
            <Icon as={AiOutlineLike} color="gray.300" />
            <Text color="gray.300" ml={1}>12</Text>
          </Flex>
          <Flex alignItems="center" ml={4}>
            <Icon as={IoIosStats} color="gray.300" />
            <Text color="gray.300" ml={1}>12</Text>
          </Flex>
        </Flex>
        <Text color="gray.300">@caelinsutch</Text>
      </Flex>
    </Box>
  </Box>
);

export default WidgetCard;
