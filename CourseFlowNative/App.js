import React from "react";
import { Login, SignUp, ForgetPassword, Profile, Home } from "./src/screens";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/contexts/AuthProvider";
import { View, Text, Button, Image } from "react-native";

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./src/components/Logo/Logo.png")}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerTitleAlign: "center",
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              headerTitleAlign: "center",
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitleAlign: "center",
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitleAlign: "center",
              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
