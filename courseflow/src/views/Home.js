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
import { VStack, Box, Button } from "@chakra-ui/react";

function Home() {
  const [page, setPage] = useState("firstPage");

  const navigate = useNavigate();
  function goToProfile() {
    navigate("/profile");
  }

  const { data: courses } = useCourses();

  if (courses === undefined) {
    return null;
  }

  if (page === "firstPage") {
    return (
      <div>
        <CenterContainer>
          <StyledButton onClick={goToProfile}>Profile</StyledButton>
          <StyledCard>
            <StyledTitle>Homepage</StyledTitle>
          </StyledCard>
        </CenterContainer>
        <VStack>
          {courses.map((course) => (
            <Box
              as="button"
              padding="10px"
              w={1 / 2}
              borderColor="#f5f5f5"
              boxShadow="md"
              borderRadius="md"
              shadow="md"
              margin="5px"
              backgroundColor="white"
              _hover={{ fontWeight: "semibold" }}
              key={course.name}
            >
              {course.name}
            </Box>
          ))}
        </VStack>
      </div>
    );
  }
}

export default Home;
