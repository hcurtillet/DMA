import React from 'react'
import {ListGroup} from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { database } from "../firebase"
import {StyledQuestionItemTitle, StyledTimestampSmall, StyledUsernameSmall} from "./auth/style";
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import useSWR from "swr";

export default function QuestionsList() {
    async function getQuestions() {
        
        
        let questionsCollection = collection(database, "Questions");
        let questionsQuery = query(questionsCollection, where("courseId", "==", courseID));
        const snapshot = await getDocs(questionsQuery);
        const questions = snapshot.docs.map((doc) => doc.data());
        questions.sort((a,b) =>{ //in order to sort the message list by date
            return a.date.seconds - b.date.seconds;
        })
        return questions;
    }

    function useQuestions() {
        return useSWR("Questions", getQuestions);
    }

    function toDate(timestamp) {
      let date = new Date(timestamp*1000);
      return date.toLocaleString();
    }
    
    function goToQuestion(question) {
      navigate("/question/"+question.id.trim());
    }

    const navigate = useNavigate();
    const courseID = useLocation().pathname.replace("/courses/","");
    const {data: questions} = useQuestions();
    
    if(questions=== undefined || questions === null || questions.length === 0) {
      return ( <h3> No question has been asked yet !</h3>);
    }

    return (
      <ListGroup>
        {questions.map(question => 
          <ListGroup.Item  key={""+question.title} action onClick={() => goToQuestion(question)}> 
            <StyledQuestionItemTitle>{question.title}</StyledQuestionItemTitle>
            <div className="d-flex justify-content-between">
              <StyledUsernameSmall>{question.userName}</StyledUsernameSmall>
              <StyledTimestampSmall>{toDate(question.date.seconds)}</StyledTimestampSmall>
            </div>
          </ListGroup.Item>)}
    </ListGroup>);
};
