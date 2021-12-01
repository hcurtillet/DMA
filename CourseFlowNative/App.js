import React from 'react';
import { 
  Login, 
  SignUp,
  ForgetPassword,
  Profile,
  Home
} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/contexts/AuthProvider';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Stack = createStackNavigator();

const NavContainer = styled(NavigationContainer)`
  background-color: #E5E5E5;
  min-height:100vh;
  margin:0;
  font-family: Georgia, "Times New Roman", Times, serif;
`;

export default function App() {
  
  return (
      <AuthProvider>
          <NavContainer>
          <AuthProvider>
            <Stack.Navigator
              initialRouteName="Home"
              // screenOptions={{
              //   headerShown: false,
              // }}
            >
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Profile" component={Profile}/>

            </Stack.Navigator>
            </AuthProvider> 
          </NavContainer>
        </AuthProvider>
      
  )
}