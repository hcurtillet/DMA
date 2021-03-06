import styled from "styled-components";
import { Button, Card, InputGroup, Form, Collapse } from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";

export const StyledCard = styled(Card)`
  background-color: #e5e5e5;
  border: none;
  display: flex;
  padding: 20px;
  margin: 20px;
  max-width: 400px;
  text-align: center;
  align-content: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledForm = styled(Form)`
  align-content: center;
  text-align: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

export const StyledLink = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 15px;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledEmailIcon = styled(Envelope)`
  display: inline-block;
  height: 36px;
  width: 20px;
  margin-right: 10px;
  text-align: center;
`;

export const StyledPasswordIcon = styled(Lock)`
  display: inline-block;
  height: 36px;
  width: 20px;
  margin-right: 10px;
  text-align: center;
`;

export const StyledButton = styled(Button)`
  background: #f5f5f5;
  color: black;
  border-radius: 30px;
  width: 150px;
  margin-bottom: 35px;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledInput = styled(InputGroup)`
  width: 100%;
  border-radius: 30px;
  margin-bottom: 20px;
  vertical-align: middle;
  text-align: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledIcon = styled.div`
  display: inline-block;
  background-color: whitesmoke;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  margin-right: 10px;
  margin-bottom: 20px;
`;

export const StyledCollapse = styled(Collapse)`
  background: whitesmoke;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledQuestionItemTitle = styled.h2`
    text-align: left; 
    margin-bottom: 5px;
`;

export const StyledTimestampSmall = styled.div`
    text-align:right;
    font-size:10px;
    bottom-margin:5px;
    opacity:0.8;
`;

export const StyledUsernameSmall = styled.div`
    text-align:left;
    font-size:14px;
    bottom-margin:5px;
`;

export const StyledInputQuestion = styled(InputGroup)`
    width: 100%;
    min-height: 100px;
    border-radius: 30px;
    margin-bottom: 20px;
    vertical-align: middle;
    multi-line: true;
    text-align: center;
    font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledQuestionTitle = styled.div`
    horizontal-align: center;
    margin: 0 auto;
    padding: 30px;
    font-size: 25px;
    text-align:center;
    width:100%;
    background-color: #1A54A6;
`;

export const StyledQuestionText = styled.div`
    font-size: 20px;
    text-align:justify;
`;

export const StyledMessage = styled.div`
    margin: 10px auto;
    font-size: 20px;
    text-aligh: left;
    background-color: #D1D1D1;
    width:95%;
    padding:30px;

`;

export const StyledUserMessage = styled.div`
    text-align:left;
`;

export const StyledTimeMessage = styled.div`
    text-align:right;
    font-size:16px;
    bottom-margin:50px;
`;

export const StyledButtonAnswer = styled(Button)`
    background: #F5F5F5;
    color: black;
    border-radius: 30px;
    font-size: 20px;
    margin: 0;
    font-family: Georgia, "Times New Roman", Times, serif;
    transform: translateX(25vh);
`;