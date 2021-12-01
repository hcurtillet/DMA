import styled from "styled-components";
import { StyleSheet } from 'react-native';
import { Button, Card, InputGroup, Form, Collapse, Alert } from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";

export const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
    fontFamily: 'Georgia, "Times New Roman", Times, serif'
  },

  row:{
    width: '100%',
    textAlign: 'center',
    marginTop: '15px',
    fontFamily: 'Georgia, "Times New Roman", Times, serif'
  },

  button:{
    backgroundColor: '#f5f5f5',
    color: 'black',
    borderRadius: 30,
    width: 150,
    marginBottom: 35,
    fontFamily: 'Georgia, "Times New Roman", Times, serif'
  },

  link: {
    color: '#0d6efd',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
    marginLeft: 5
  },

  icon:{
    display: 'inline-block',
    backgroundColor: 'whitesmoke',
    height: 40,
    width: 40,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  }
});

export const StyledCard = styled(Card)`
  background-color: #e5e5e5;
  border: none;
  display: flex;
  padding: 20px;
  margin: 20px;
  max-width: 400px;
  height:100%;
  text-align: center;
  align-content: center;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export const StyledForm = styled(Form)`
  align-content: center;
  text-align: center;
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

export const StyledCollapse = styled(Collapse)`
  background: whitesmoke;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const StyledAlert = styled(Alert)`

`;