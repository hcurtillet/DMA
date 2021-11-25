import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledEmailIcon,
  StyledPasswordIcon,
  StyledButtonAnswer,
  StyledInput,
  StyledLink,
  StyledCard,
  StyledTitle,
  StyledCourseButton,
  StyledForm,
  StyledCourse,
  StyledQuestionTitle,
  StyledQuestionText,
  StyledMessage,
  StyledUserMessage,
  StyledTimeMessage,
  StyledCenterButton
} from "./auth/style";
import {Form, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { QuestionContainer } from "../components";
import QuestionModel from "../model/QuestionModel";
import { database } from "../firebase"
import { getFirestore, collection, doc, getDocs, getDoc } from "firebase/firestore/lite";
import useSWR from "swr";
import { VStack, Box, Button } from "@chakra-ui/react";


export var idQuestion = "This is my first question";

async function getQuestions() {
    const questionsCollection = doc(database, "Questions", idQuestion);
    const questionsSnapshot = await getDoc(questionsCollection);
    //const questionsList = questionsSnapshot.docs.map((doc) => doc.data());
    return questionsSnapshot.data();
}
  
function useQuestion() {
    return useSWR("Questions", getQuestions);
}

async function getMessages() {
    const questionsCollection = collection(database, "Messages");
    const questionsSnapshot = await getDoc(questionsCollection);
    //const questionsList = questionsSnapshot.docs.map((doc) => doc.data());
    return questionsSnapshot.data();
}
  
function useMessages() {
    return useSWR("Messages", getMessages);
}


function Forum(){
    const {data: question} = useQuestion();
    const {data: messages} = useMessages();

    function addAnswer(){
        console.log("test");
    }

    if(question != undefined){
        console.log(question);
        return(
            <QuestionContainer>
                    <StyledQuestionTitle>{question.title}</StyledQuestionTitle>
                    <StyledMessage>
                        <StyledUserMessage>{question.userName}</StyledUserMessage>
                        <StyledTimeMessage>{question.date.toString()}</StyledTimeMessage>
                        <StyledQuestionText>{question.text}</StyledQuestionText>
                    </StyledMessage>
                    <Form>
                        <StyledInput id="email">
                            <Form.Control
                                type="text"
                                placeholder="Write an answer..."
                            />
                        </StyledInput>
                            <StyledButtonAnswer onClick={addAnswer}>
                                Answer
                            </StyledButtonAnswer>
                    </Form>
                    
            </QuestionContainer>
        )
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