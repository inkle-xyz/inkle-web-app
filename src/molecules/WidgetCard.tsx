import {
  Box, Flex, Heading, Icon, Image, Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineLike, IoIosStats } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import NoWidgetImage from './NoWidgetImage';
import { Widget } from '../interfaces/widget.interface';

type WidgetCardProps = {
  widget: Widget;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
}) => {
  const history = useHistory();
  const {
    name, description, author, image, id,
  } = widget;

  const onClick = () => {
    history.push(`/widget/${id}`);
  };

  return (
    <Flex
      borderRadius="lg"
      boxShadow="lg"
      h="450px"
      flexDirection="column"
      overflow="hidden"
      onClick={() => onClick()}
    >
      <Box flexGrow={1}>
        {
          image
            ? <Image src={image} />
            : <NoWidgetImage />

        }
      </Box>
      <Box p={6}>
        <Heading
          mt="1"
          fontWeight="bold"
          as="h4"
          lineHeight="tight"
          isTruncated
          size="md"
        >
          {name}
        </Heading>
        <Text mt={2} fontSize="sm">
          {description}
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
          <Text color="gray.300">{author}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
export default WidgetCard;
