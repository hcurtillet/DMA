import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  StyledButtonAnswer,
  StyledInput,
  StyledInputQuestion
} from "./auth/style";
import {Form} from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { database } from "../firebase"
import { collection, addDoc, setDoc } from "firebase/firestore/lite";
import { Center, VStack, Box, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import {theme} from "./Home";


function AddQuestion(props){
    function toDate(seconds){
        const dateObject = new Date(seconds*1000);
        return dateObject.toLocaleString();
    }

    async function updateQuestion(newQuestionObject){
        const questionsCollection = collection(database, "Questions");
        const res = await addDoc(questionsCollection, newQuestionObject);
        await setDoc(res, { id: res.id });

        navigate("/courses/"+idCourse);
    }

    function addQuestion(){
        const newQuestionObject = {
            courseId: idCourse,
            date:{seconds: Date.now()/1000, nanoseconds: 0},
            userName: currentUser.email,
            text: newQuestionText,
            title: newQuestionTitle
        }
        updateQuestion(newQuestionObject);
        
    }

    const goBack = () => {
      navigate(-1);
    }

    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionText, setNewQuestionText] = useState('');

    const idCourse = location.state;

    const btnRef = React.useRef();

    if(idCourse === undefined || idCourse === null) {
        return null;
    }


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
              <Box textStyle="h1" mb="20px">Ask something !</Box>
            </Center>
            <VStack>
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
            </VStack>
          </ChakraProvider>
        </div>
    );
}

export default AddQuestion;