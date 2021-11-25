import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledEmailIcon,
  StyledPasswordIcon,
  StyledButton,
  StyledInput,
  StyledLink,
  StyledCard,
  StyledTitle,
  StyledCourseButton,
  StyledForm,
  StyledCourse,
} from "./auth/style";
import { useState } from "react";
import { CenterContainer } from "../components";
import { useCourses } from "../firebase";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  VStack,
  Box,
  Button,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, ChatIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
function Home() {
  const navigate = useNavigate();
  function goToProfile() {
    navigate("/profile");
  }

  function goToHelp() {
    //navigate("/profile");
  }

  function goToMessage() {
    //navigate("/profile");
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");
  const btnRef = React.useRef();

  const { data: courses } = useCourses();

  if (courses === undefined) {
    return null;
  }

  return (
    <div>
      <ChakraProvider>
        <IconButton
          ref={btnRef}
          colorScheme="blue"
          onClick={onOpen}
          icon={<HamburgerIcon />}
        ></IconButton>
        <Center>
          <Heading>Homepage</Heading>
        </Center>

        <VStack>
          {courses.map((course) => (
            <Box
              as="button"
              padding="10px"
              w={3 / 4}
              borderColor="#f5f5f5"
              boxShadow="md"
              borderRadius="md"
              shadow="md"
              backgroundColor="white"
              key={course.name}
            >
              {course.name}
            </Box>
          ))}
        </VStack>
        <Drawer
          isOpen={isOpen}
          placement={placement}
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Settings</DrawerHeader>
            <DrawerBody>
              <VStack>
                <Button
                  padding="10px"
                  w={3 / 4}
                  boxShadow="md"
                  borderRadius="md"
                  shadow="md"
                  onClick={goToProfile}
                  icon={<CgProfile />}
                >
                  Profile
                </Button>
                <Button
                  padding="10px"
                  w={3 / 4}
                  borderColor="#f5f5f5"
                  boxShadow="md"
                  borderRadius="md"
                  shadow="md"
                  margin="5px"
                  onClick={goToHelp}
                  icon={<ChatIcon />}
                >
                  Chat
                </Button>
                <Button
                  padding="10px"
                  w={3 / 4}
                  borderColor="#f5f5f5"
                  boxShadow="md"
                  borderRadius="md"
                  shadow="md"
                  margin="5px"
                  onClick={goToMessage}
                  icon={<QuestionOutlineIcon />}
                >
                  Help
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
    </div>
  );
}

export default Home;
