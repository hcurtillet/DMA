import React, { useState } from "react";
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
  StyledCenteringDiv,
  StyledInputQuestion
} from "./auth/style";
import {Form, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { QuestionContainer } from "../components";
import QuestionModel from "../model/QuestionModel";
import { database } from "../firebase"
import { getFirestore, collection, doc, getDocs, getDoc, where, query, setDoc } from "firebase/firestore/lite";
import useSWR from "swr";
import { VStack, Box, Button } from "@chakra-ui/react";
import { idQuestion } from "./Forum";


export var idCourse = "ID1202";

function toDate(seconds){
    const dateObject = new Date(seconds*1000);
    return dateObject.toLocaleString();
}

function updateQuestion(newQuestionObject){
    const questionsCollection = collection(database, "Questions");
    const res = setDoc(doc(questionsCollection), newQuestionObject);
    res.then((result) => {
        while(result==undefined);
        console.log(result);
    });
    //console.log("res:" + res);
}


function AddQuestion(){
    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const navigate = useNavigate();
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionText, setNewQuestionText] = useState('');
    function addQuestion(){
        const newQuestionObject = {
            courseId: idCourse,
            date:{seconds: Date.now()/1000, nanoseconds: 0},
            userName: currentUser.email,
            text: newQuestionText,
            title: newQuestionTitle
        }
        //console.log(newQuestionObject);
        updateQuestion(newQuestionObject);
        
    }
    return(
        <QuestionContainer>
                <StyledQuestionTitle>{idCourse}</StyledQuestionTitle>
                <Form>
                    <StyledInput>
                        <Form.Control
                            type="text"
                            placeholder="A title for your question..."
                            onChange={event => setNewQuestionTitle(event.target.value)}
                        />
                    </StyledInput>
                    <StyledInputQuestion>
                        <Form.Control
                            type="text"
                            placeholder="Ask something"
                            onChange={event => setNewQuestionText(event.target.value)}
                        />
                    </StyledInputQuestion>
                        <StyledButtonAnswer onClick={addQuestion}>
                            Post your question !
                        </StyledButtonAnswer>
                </Form>     

            </QuestionContainer>
    );
}

export default AddQuestion;