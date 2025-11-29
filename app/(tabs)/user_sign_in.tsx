import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { useRouter } from 'expo-router';
import { useUser } from '../../context/userContext'; // Import the UserContext


const SignIn = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(''); // Changed from username to email to match backend
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setUserId } = useUser();

  const handleBack = () => {
    router.replace('/user_registration'); 
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.200.134:5000/api/users/login", 
        { email, password }, // Changed to email to match backend
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Login successful!");
        await setUserId(response.data.user.id); // Store user ID in local storage
        router.push('/User_Home');
      }
    } catch (error: unknown) {
      let errorMessage = "Invalid credentials or server error";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.signIn, styles.signInLayout]}>
      {/* Background elements - unchanged */}
      <View style={styles.signInChild} />
      <View style={[styles.signInItem, styles.signPosition]} />
      <View style={[styles.signInInner, styles.signPosition]} />
      <View style={[styles.rectangleView, styles.signChildShadowBox]} />
      <View style={[styles.signInChild1, styles.signChildShadowBox]} />
      <View style={[styles.signInChild2, styles.signChildShadowBox]} />

      {/* Input fields - unchanged */}
      <TextInput
        style={[styles.inputBox, { top: 268 }]}
        placeholder="Email" // Changed from Username to Email
        placeholderTextColor="#696969"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.inputBox, { top: 347 }]}
        placeholder="Password"
        placeholderTextColor="#696969"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.eye} onPress={togglePasswordVisibility}>
        <Image
          style={[styles.eyeIcon, styles.signInLayout]}
          resizeMode="contain"
          source={
            passwordVisible
              ? require("../../assets/images/Eye.png")
              : require("../../assets/images/Eye_close.png")
          }
        />
      </TouchableOpacity>

      {/* Buttons - unchanged */}
      <TouchableOpacity onPress={() => console.log("Forgot Password pressed")}>
        <Text style={[styles.forgotPassword, styles.loginTypo]}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBack}>
        <Text style={[styles.signIn1, styles.signIn1Typo]}>Sign in</Text>
        <Text style={[styles.register, styles.signIn1Typo]}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.letsGetYou}>Let's get you signed in!</Text>
    </View>
  );
};

// Your EXACT original styles - unchanged
const styles = StyleSheet.create({
  signInLayout: { overflow: "hidden", width: "100%" },
  signPosition: {
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170,
    left: "50%",
    position: "absolute"
  },
  signChildShadowBox: {
    height: 55,
    borderRadius: 20,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    width: 341,
    position: "absolute"
  },
  usernameTypo: {
    height: 28,
    color: "#696969",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    left: 56,
    textAlign: "left",
    position: "absolute"
  },
  loginTypo: {
    fontFamily: "Roboto-Regular",
    textAlign: "left",
    fontSize: 16,
    position: "absolute"
  },
  signIn1Typo: {
    height: 29,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    top: 159,
    textAlign: "left",
    position: "absolute"
  },
  inputBox: {
    position: "absolute",
    left: 50,
    width: 250,
    height: 40,
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#696969"
  },
  signInChild: {
    top: 0,
    left: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "#37546a",
    width: 421,
    height: 173,
    position: "absolute"
  },
  signInItem: {
    width: 341,
    backgroundColor: "#ebeff2",
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170
  },
  signInInner: {
    backgroundColor: "#ef5334",
    width: 185,
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170
  },
  rectangleView: { top: 261, left: 35, backgroundColor: "#ebeff2" },
  signInChild1: { top: 339, left: 35, backgroundColor: "#ebeff2" },
  signInChild2: { top: 496, left: 32, backgroundColor: "#2a3440" },
  username: { top: 278, width: 274 },
  password: { top: 357, width: 236 },
  forgotPassword: {
    top: 415,
    left: 232,
    color: "#ef5334",
    width: 141,
    height: 20
  },
  eyeIcon: { height: "100%", width: "100%", position: "absolute" },
  eye: { top: 353, left: 325, width: 25, height: 25, position: "absolute" },
  signIn1: { left: 94, width: 69, color: "#fcfcfc" },
  register: { left: 252, color: "#696969", width: 83 },
  loginButton: {
    top: 496,
    left: 32,
    backgroundColor: "#2a3440",
    height: 55,
    width: 341,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    position: "absolute"
  },
  loginText: { color: "#fff", fontSize: 16, fontFamily: "Roboto-Regular" },
  letsGetYou: {
    top: 65,
    left: 21,
    fontSize: 23,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    width: 298,
    height: 35,
    color: "#fcfcfc",
    textAlign: "left",
    position: "absolute"
  },
  signIn: { backgroundColor: "#fcfcfc", flex: 1, height: 917 }
});

export default SignIn;