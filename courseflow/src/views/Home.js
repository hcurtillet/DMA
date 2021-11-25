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
          <StyledCard>
            <StyledTitle>Homepage</StyledTitle>
          </StyledCard>
        </CenterContainer>
        <VStack>
          {courses.map((course) => (
            <Button
              padding="10px"
              borderColor="red"
              borderWidth="4px"
              borderRadius="md"
              shadow="md"
              margin="10px"
              backgroundColor="white"
              key={course.name}
            >
              {course.name}
            </Button>
          ))}
        </VStack>

        <StyledButton onClick={goToProfile}>Profile</StyledButton>
      </div>
    );
  }
}

export default Home;
