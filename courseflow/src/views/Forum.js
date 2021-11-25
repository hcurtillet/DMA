import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Alert} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { CenterContainer } from "../components";
import QuestionModel from "../model/QuestionModel";

function Forum(){
    const question = new QuestionModel();
    question.getQuestion();

    return(
        <CenterContainer>
            <div>
                <h1>This is the forum page</h1>
                <text>{question.title}</text>
            </div>
        </CenterContainer>
    )
}

export default Forum;