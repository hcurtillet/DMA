import styled from "styled-components/native";
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    maxWidth:400
  },

  form:{
    alignContent:'center',
    justifyContent:'center',
  },

  profile:{
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },

  title:{
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  },

  row:{
    width: 350,
    textAlign: 'center',
    alignItems:'center',
    marginTop: 15,
  },

  link: {
    color: '#0d6efd',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginLeft: 5
  },

  icon:{
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 50,
    textAlign: 'center',
    lineHeight: 40,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  },

  button:{
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    width: 150,
    height: 40,
  },

  logOutButton:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336', /* Red */
    borderRadius: 30,
    width: 150,
    height: 40,
  },

  logOutText:{
    color:'white',
    fontWeight:'bold'
  },

  textInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 10,
  },

  alert: {
    padding: 20,
    backgroundColor: '#f44336', /* Red */
    color: 'white',
    marginBottom: 15,
    width:400,
    textAlign: 'center',
  },

  message: {
    padding: 20,
    backgroundColor: '#4CAF50', /* Red */
    color: 'white',
    marginBottom: 15,
    width:400,
    textAlign: 'center',
  },

});
