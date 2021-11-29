import React from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../firebase";
import {
  Center,
  VStack,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, ChatIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";

const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["32px", "48px"],
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["24px", "32px"],
      lineHeight: "120%",
      letterSpacing: "-1%",
    },
  },
});

function Home() {
  const navigate = useNavigate();
  function goToProfile() {
    navigate("/profile");
  }

  function goToHelp() {
    //navigate("/help");
  }

  function goToMessage() {
    //navigate("/message");
  }

  function goToCourse(course) {
    console.log(course);
    //navigate("/course");
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
      <ChakraProvider theme={theme}>
        <IconButton
          ref={btnRef}
          colorScheme="blue"
          onClick={onOpen}
          icon={<HamburgerIcon />}
        ></IconButton>

        <Center>
          <Box textStyle="h1">Homepage</Box>
        </Center>
        <VStack>
          <Box textStyle="h2" size="md">
            Courses
          </Box>
          {courses.map((course) => (
            <Box
              padding="10px"
              w={3 / 4}
              borderColor="#f5f5f5"
              boxShadow="dark-lg"
              borderRadius="md"
              //shadow="xl"
              backgroundColor="white"
              key={course.name}
              onClick={() => goToCourse(course)}
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
