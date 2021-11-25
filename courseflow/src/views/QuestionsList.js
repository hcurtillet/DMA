import React from 'react'
import {ListGroup} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { database } from "../firebase"
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
    console.log(questions)
    return (
      <div>
        <ListGroup>
          {questions.map(question => 
            <ListGroup.Item  key={""+question.title} action href={"/"+question.title}> 
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{question.title}</h5>
              </div>
              <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">{question.userName}</p>
                <small>{toDate(question.date.seconds)}</small>
              </div>
            </ListGroup.Item>)}
      </ListGroup>
    </div>
    )
};
