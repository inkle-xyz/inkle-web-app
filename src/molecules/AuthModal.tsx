import React from 'react';
import {
  Button,
  Center,
  Heading,
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

const AuthModal = () => {
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
          <Text textAlign="center" mb="2rem">
            Ready to make some awesome widgets?
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
