import React, { useState, useRef } from "react";
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
  StyledCenteringDiv
} from "./auth/style";
import {Form, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { QuestionContainer } from "../components";
import QuestionModel from "../model/QuestionModel";
import { database } from "../firebase"
import { getFirestore, collection, doc, getDocs, getDoc, where, query, setDoc } from "firebase/firestore/lite";
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
    const messagesCollection = collection(database, "Messages");
    const messagesQuery = query(messagesCollection, where("questionId", "==", idQuestion));
    const messagesSnapshot = await getDocs(messagesQuery);
    const messagesList= messagesSnapshot.docs.map((doc) => doc.data());
    messagesList.sort((a,b) =>{ //in order to sort the message list by date
        return a.date.seconds - b.date.seconds;
    })
    return messagesList;
}
  
function useMessages() {
    return useSWR("Messages", getMessages);
}

function toDate(seconds){
    const dateObject = new Date(seconds*1000);
    return dateObject.toLocaleString();
}

function updateAnswer(newAnswerObject){
    const messagesCollection = collection(database, "Messages");
    setDoc(doc(messagesCollection), newAnswerObject);
}

function Forum(){
    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const {data: question} = useQuestion();
    const {data: messages} = useMessages();
    const [newAnswer, setNewAnswer] = useState('');

    function addAnswer(){
        const newAnswerObject = {
            text: newAnswer, 
            questionId: idQuestion, 
            date:{seconds: Date.now()/1000, nanoseconds: 0},
            userName: currentUser.email
        }
        updateAnswer(newAnswerObject);
    }

    if(question != undefined && messages!=undefined){
        // console.log(question);
        // console.log(messages);
        return(
            <QuestionContainer>
                <StyledQuestionTitle>{question.title}</StyledQuestionTitle>
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