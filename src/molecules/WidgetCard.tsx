import {
  Box, Button, Flex, Heading, Image, Tag, Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NoWidgetImage from './NoWidgetImage';
import { Widget } from '../interfaces/widget.interface';

type WidgetCardProps = {
  widget: Widget;
  isCommunity?: boolean;
  onClone?: (widget: Widget) => void
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  isCommunity,
  onClone,
}) => {
  const history = useHistory();
  const {
    name, description, image, id,
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
    >
      <Box
        flexGrow={1}
        onClick={() => onClick()}
      >
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
          onClick={() => onClick()}
        >
          {name}
        </Heading>
        <Text
          mt={2}
          fontSize="sm"
          onClick={() => onClick()}
        >
          {description}
        </Text>
        <Flex
          mt={5}
          justify="space-between"
        >
          <Flex>
            {widget?.isFeatured ? <Tag colorScheme="teal">Featured</Tag> : <Box />}
            {/* <Flex alignItems="center"> */}
            {/*  <Icon as={AiOutlineLike} color="gray.300" /> */}
            {/*  <Text color="gray.300" ml={1}>12</Text> */}
            {/* </Flex> */}
            {/* <Flex alignItems="center" ml={4}> */}
            {/*  <Icon as={IoIosStats} color="gray.300" /> */}
            {/*  <Text color="gray.300" ml={1}>12</Text> */}
            {/* </Flex> */}
          </Flex>
          {
            isCommunity && onClone
              ? (
                <Button size="sm" colorScheme="yellow" color="white" onClick={() => onClone(widget)}>
                  Clone Widget
                </Button>
              ) : <></>
          }
        </Flex>
      </Box>
    </Flex>
  );
};
export default WidgetCard;
