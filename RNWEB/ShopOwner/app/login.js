import * as React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";


const SignIn = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/PrintFlyers_logo_4.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>WELCOME</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User name</Text>
        <TextInput style={styles.input} placeholder="Enter User name" />
      </View>

      {/* Password with Eye Toggle */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword
                  ? require("../assets/Eye.png")
                  : require("../assets/Blind.png")
              }
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* forgot password Button */}
      <TouchableOpacity style={styles.forgotpassword}
        onPress={() => navigation.navigate("ForgotPass")}>
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}
        onPress={() => navigation.navigate("Home")}>
        <Text style={styles.signInText}>Login</Text>
      </TouchableOpacity>

      {/* Switch to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.switchText}>Don't have an account? Signin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fcfcfc",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2a3440",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ebeff2",
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 40, // Make space for eye icon
    width: "100%",
  },
  passwordField: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 25,
    height: 25,
  },
  eyeImage: {
    width: 25,
    height: 25,
  },
  signInButton: {
    backgroundColor: "#2a3440",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginTop: 20,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    marginTop: 20,
    fontSize: 16,
    color: "#5a7f9c",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 1,
  },
  
  forgotPasswordText: {
    color: "#EF5334",
    fontSize: 14,
    fontWeight: "500",
  },
  
});

export default SignIn; 