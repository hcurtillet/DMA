import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Logo } from "../../components";
import { styles } from "./style";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      navigation.navigate("Home");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.alert}>{error}</Text> : null}
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          required
        />

        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          onChangeText={(text) => setPassword(text)}
          required
        />

        <Button
          style={styles.button}
          title="Login"
          disabled={loading}
          onPress={(e) => handleLogin(e)}
        >
          Login
        </Button>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.link}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text>
            Create a new account?
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
