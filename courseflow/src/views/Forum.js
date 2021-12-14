import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  StyledButtonAnswer,
  StyledInput,
  StyledQuestionText,
  StyledMessage,
  StyledUserMessage,
  StyledTimeMessage
} from "./auth/style";
import {Form} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { QuestionContainer } from "../components";
import { database } from "../firebase"
import { collection, doc, getDocs, where, query, setDoc } from "firebase/firestore/lite";
import useSWR from "swr";
import { Center, VStack, Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import {theme} from "./Home";


function Forum(props){
    function toDate(seconds){
        const dateObject = new Date(seconds*1000);
        return dateObject.toLocaleString();
    }

    const goBack = () => {
      navigate(-1);
    }

    async function getMessages() {
        const messagesCollection = collection(database, "Messages");
        const messagesQuery = query(messagesCollection, where("questionId", "==", idQuestion));
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesList= messagesSnapshot.docs.map((doc) => {
            return doc.data();
        
        });
        messagesList.sort((a,b) =>{ //in order to sort the message list by date
            return a.date.seconds - b.date.seconds;
        })
        return messagesList;
    }
      
    function useMessages() {
        return useSWR("Messages", getMessages, { refreshInterval: 5000 });
    }

    const navigate = useNavigate();
    const location = useLocation();
    const btnRef = React.useRef();
    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const {data: messages} = useMessages();
    const [newAnswer, setNewAnswer] = useState('');
    const state = location.state;
    const question = state;

    if(question=== undefined || question === null) {
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
              <QuestionContainer>
                    <h1> This question is unavailable</h1>
                </QuestionContainer>
            </VStack>
          </ChakraProvider>
        </div>
        );
    }



    const idQuestion = question.id;
    

    function addAnswer(){
        const newAnswerObject = {
            text: newAnswer, 
            questionId: idQuestion, 
            date:{seconds: Date.now()/1000, nanoseconds: 0},
            userName: currentUser.email
        }
        updateAnswer(newAnswerObject);
    }

    function updateAnswer(newAnswerObject){
        const messagesCollection = collection(database, "Messages");
        setDoc(doc(messagesCollection), newAnswerObject);
    }


    if(messages !== undefined){
        return(
            <div>
              <ChakraProvider theme={theme}>
                <IconButton
                  ref={btnRef}
                  colorScheme="kth"
                  onClick={goBack}
                  icon={<ArrowBackIcon />}
                ></IconButton>

                <Center>
                  <Box textStyle="h1">{question.title}</Box>
                </Center>
                <VStack>
                  <QuestionContainer>
                        <StyledMessage>
                            <StyledUserMessage>{question.userName}</StyledUserMessage>
                            <StyledTimeMessage>{toDate(question.date.seconds)}</StyledTimeMessage>
                            <StyledQuestionText>{question.text}</StyledQuestionText>
                        </StyledMessage>
                        <Form>
                            <StyledInput id="email">
                                <Form.Control
                                    type="text"
                                    placeholder="Write an answer..."
                                    onChange={event => setNewAnswer(event.target.value)}
                                />
                            </StyledInput>
                                <StyledButtonAnswer onClick={addAnswer}>
                                    Answer
                                </StyledButtonAnswer>
                        </Form>     
                        <VStack>
                            {messages.map((message) => (
                                <StyledMessage>
                                <StyledUserMessage>{message.userName}</StyledUserMessage>
                                <StyledTimeMessage>{toDate(message.date.seconds)}</StyledTimeMessage>
                                <StyledQuestionText>{message.text}</StyledQuestionText>
                            </StyledMessage>
                                
                            ))}
                        </VStack>
                    
                    </QuestionContainer>
                </VStack>
              </ChakraProvider>
        </div>
        );
    }
    else{
        return (
            <QuestionContainer>
                    <h1> This question is unavailable</h1>
            </QuestionContainer>
        )
    }
}

export default Forum;