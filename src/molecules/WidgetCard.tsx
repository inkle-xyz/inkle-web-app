import {
  Box, Button, Flex, Heading, Tag, Text, Image,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Widget } from '../interfaces/widget.interface';

type WidgetCardProps = {
  widget: Widget;
  onClone?: (widget: Widget) => void,
  showAuthor?: boolean,
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  onClone,
  showAuthor,
}) => {
  const history = useHistory();
  const {
    name, description, id,
  } = widget;

  const onClick = () => {
    history.push(`/widget/${id}`);
  };

  return (
    <Flex
      borderRadius="lg"
      boxShadow="lg"
      flexDirection="column"
      overflow="hidden"
    >
      <Box
        flexGrow={1}
        onClick={() => onClick()}
        bgColor="gray.200"
      >
        {
        widget?.imageUrl && widget?.imageUrl !== '' && widget.isFeatured
          ? (

            <Image src={widget.imageUrl} mx="auto" />
)
          : <Box />
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
          cursor="pointer"
          _hover={{
            textDecoration: 'underline',
          }}
          onClick={() => onClick()}
        >
          {name}
        </Heading>
        <Text
          mt={2}
          fontSize="sm"
          onClick={() => onClick()}
          isTruncated
        >
          {description}
        </Text>
        {
          showAuthor
            ? (
              <Text color="gray.500" fontSize="sm" mt={2}>
                Made By
                {' '}
                {widget.authorName}
              </Text>
            ) : <Box />
        }
        <Flex
          mt={5}
          justify="space-between"
        >
          <Flex>
            {widget?.isFeatured && widget?.isPublished ? <Tag colorScheme="teal">Featured</Tag> : <Box />}
          </Flex>
          {
            onClone
              ? (
                <Button size="sm" onClick={() => onClone(widget)}>
                  Copy Widget
                </Button>
              ) : <></>
          }
        </Flex>
      </Box>
    </Flex>
  );
};
export default WidgetCard;
