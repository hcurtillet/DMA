import React from 'react';
import { 
  Login, 
  SignUp,
  ForgetPassword,
  Profile,
  Home
} from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
          >
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="SignUp" component={SignUp}/>
              <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="Profile" component={Profile}/>

          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
      
  )
}