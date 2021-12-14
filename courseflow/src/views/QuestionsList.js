import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { database } from "../firebase"
import {StyledQuestionItemTitle, StyledTimestampSmall, StyledUsernameSmall} from "./auth/style";
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import useSWR from "swr";
import {
  Center,
  VStack,
  Box,
  IconButton,
  Button
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import {theme} from "./Home";

export default function QuestionsList() {
    async function getAllQuestions() {
        const questionsListCollection = collection(database, "Questions");
        const questionsListQuery = query(questionsListCollection, where("courseId", "==", courseID));
        const snapshot = await getDocs(questionsListQuery);
        const allQuestions = snapshot.docs.map((doc) => doc.data());
        allQuestions.sort((a,b) =>{ //in order to sort the message list by date
            return a.date.seconds - b.date.seconds;
        })
        return allQuestions;
    }

    function useQuestionsList() {
        return useSWR("Questions", getAllQuestions);
    }

    function toDate(timestamp) {
      const date = new Date(timestamp*1000);
      return date.toLocaleString();
    }
    
    function goToQuestion(question) {
      navigate("/question/"+question.id.trim(), {state:question});
    }

    function goToAskQuestion(id) {
      navigate("/ask-question/"+ id.trim(), {state:id});
    }

    const goBack = () => {
      navigate(-1);
    }

    const btnRef = React.useRef();
    const navigate = useNavigate();
    const courseID = useLocation().pathname.replace("/courses/","");
    const {data: questionsList} = useQuestionsList();
    
    
    if(questionsList=== undefined || questionsList === null || questionsList.length === 0) {
      return (
        <div>
          <ChakraProvider theme={theme}>
            <IconButton
              ref={btnRef}
              colorScheme="kth"
              onClick={goBack}
              icon={<ArrowBackIcon />}
            ></IconButton>

            <Center>
              <Box textStyle="h1">Questions</Box>
            </Center>
            <VStack>
                <h1> No questions have been asked yet ! </h1>
            </VStack>
          </ChakraProvider>
        </div>
        );
    }


  return (
    <div>
      <ChakraProvider theme={theme}>
        <IconButton
          ref={btnRef}
          colorScheme="kth"
          onClick={goBack}
          icon={<ArrowBackIcon />}
        ></IconButton>

        <Center>
          <Box textStyle="h1">Questions</Box>
        </Center>
        <Center>
          <Button mt="20px" w={3 / 4} colorScheme="kth" alignSelf="center" onClick={() => goToAskQuestion(courseID)}>Ask a question</Button>
        </Center>
        <VStack>
          {questionsList.map(question => (
            <Box
              mt="20px"
              padding="20px"
              w={3 / 4}
              borderColor="#f5f5f5"
              boxShadow="dark-lg"
              borderRadius="md"
              //shadow="xl"
              backgroundColor="white"
              key={question.id}
              onClick={() => goToQuestion(question)}
            >
              <StyledQuestionItemTitle>{question.title}</StyledQuestionItemTitle>
              <div className="d-flex justify-content-between">
                <StyledUsernameSmall>{question.userName}</StyledUsernameSmall>
                <StyledTimestampSmall>{toDate(question.date.seconds)}</StyledTimestampSmall>
              </div>
            </Box>
          ))}
        </VStack>
      </ChakraProvider>
    </div>
  );
};
