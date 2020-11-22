import {
  Box, Flex, Heading, Switch, Tag, Text,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Widget } from '../interfaces/widget.interface';

type Props = {
  widget: Widget;
  onToggleFeatured: (isFeatured: boolean) => void
}

const AdminWidgetCard: React.FC<Props> = ({
  widget,
  onToggleFeatured,
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
        <Flex
          mt={5}
          justify="space-between"
        >
          <Flex>
            {widget?.isFeatured && widget?.isPublished ? <Tag colorScheme="teal">Featured</Tag> : <Box />}
          </Flex>
          <Box>
            <Switch
              defaultIsChecked={widget.isFeatured}
              colorScheme="teal"
              onChange={() => {
                onToggleFeatured(!widget.isFeatured);
              }}
              id="email-alerts"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
export default AdminWidgetCard;
