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
