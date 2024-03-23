import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { userSignUp } from "../../config/fireBase";

function SignUp({ navigation }) {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = navigation.navigate;
  const signUp = async () => {
    if (!userName || !userType || !email || !password) {
      return alert("fill all");
    } else {
      await userSignUp({ userName, userType, email, password }, navigator);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#CCCCCC"
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="driver/passanager"
          placeholderTextColor="#CCCCCC"
          onChangeText={(text) => {
            setUserType(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#CCCCCC"
          keyboardType="email-address"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#CCCCCC"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator("Login")}
          style={styles.loginText}
        >
          <Text>Already have an account Click Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF5733", // Custom background color
    opacity: 0.6, // Adjust opacity as needed
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#FF5733",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default SignUp;
