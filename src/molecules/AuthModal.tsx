import React from 'react';
import {
  Button,
  Center,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { authenticateUser } from '../services/auth.services';
import GoogleColorIcon from '../atoms/GoogleColorIcon';
import { signupWidgetState, userState } from '../recoil/atoms';

const AuthModal: React.FC = () => {
  const [isSignupWidgetOpen, setSignupWidgetStateOpen] = useRecoilState(signupWidgetState);
  const setUserState = useSetRecoilState(userState);
  const history = useHistory();

  return (

    <Modal isOpen={isSignupWidgetOpen} onClose={() => setSignupWidgetStateOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p="2rem">
          <Center mb="1rem">
            <Heading size="xl" color="gray.700">
              Sign Up
            </Heading>
          </Center>
          <Text textAlign="center" mb=".5rem">
            Ready to make some awesome widgets?
          </Text>
          <Text textAlign="center" mb="1.7rem" fontSize="xs" color="gray.400">
            By authenticating you agree to our
            {' '}
            <Link
              href="https://www.notion.so/caelinsutch/Inkle-TOS-dd2fab9843bd407498c003e824bb9a9a"
              target="_blank"
              rel="noopener noreferrer"
              textDecoration="underline"
            >
              Terms of Service
            </Link>
          </Text>
          <ModalFooter>
            <Button
              mx="auto"
              size="lg"
              onClick={() => authenticateUser().then((newUser) => {
                setSignupWidgetStateOpen(false);
                setUserState(newUser);
                if (newUser) {
                  history.push('/welcome');
                } else {
                  history.push('/dashboard');
                }
              })}
              leftIcon={<GoogleColorIcon />}
            >
              Sign Up With Google
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
