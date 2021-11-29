import React from 'react'
import {ListGroup} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { database } from "../firebase"
import {StyledTimeMessage, StyledQuestionItemTitle, StyledTimestampSmall, StyledUsernameSmall} from "./auth/style";
import { getFirestore, collection, doc, getDocs, getDoc, where, query, setDoc } from "firebase/firestore/lite";
import useSWR from "swr";

export default function QuestionsList() {
    async function getQuestions() {
        const courseID = "ID1202";
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

    const {data: questions} = useQuestions();

    if(questions===undefined) return null;

    return (
      <ListGroup>
        {questions.map(question => 
          <ListGroup.Item  key={""+question.title} action href={"/"+question.title}> 
            <StyledQuestionItemTitle>{question.title}</StyledQuestionItemTitle>
            <div className="d-flex justify-content-between">
              <StyledUsernameSmall>{question.userName}</StyledUsernameSmall>
              <StyledTimestampSmall>{toDate(question.date.seconds)}</StyledTimestampSmall>
            </div>
          </ListGroup.Item>)}
    </ListGroup>);
};
