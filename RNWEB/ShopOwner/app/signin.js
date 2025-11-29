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
  const [mobile, setMobile] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/PrintFlyers_logo_4.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>SIGN IN</Text>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User Name</Text>
        <TextInput style={styles.input} placeholder="Enter User name" />
      </View>

      {/* Shop Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Shop Name</Text>
        <TextInput style={styles.input} placeholder="Enter shop name" />
      </View>

      {/* Identity */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Enter address" />
      </View>

      <View style={styles.inputContainer}>
  <Text style={styles.label}>Mobile</Text>
  <TextInput
  style={[
    styles.input,
    mobileError ? { borderColor: "#EF5334", borderWidth: 1 } : null,
  ]}
  placeholder="Enter mobile"
  keyboardType="numeric"
  maxLength={10}
  value={mobile}
  onChangeText={(text) => {
    const onlyNums = /^[0-9]*$/;
    if (!onlyNums.test(text)) {
      setMobileError("Only numbers are valid");
    } else {
      setMobile(text);
      if (text.length === 10) {
        setMobileError("");
      }
    }
  }}
/>

  {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
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

      {/* Confirm Password with Eye Toggle */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Image
              source={
                showConfirmPassword
                  ? require("../assets/Eye.png")
                  : require("../assets/Blind.png")
              }
              style={styles.eyeImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
  style={styles.signInButton}
  onPress={() => {
    if (mobile.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
    } else {
      setMobileError("");
      navigation.navigate("Home");

    }
  }}
>
  <Text style={styles.signInText}>Sign In</Text>
</TouchableOpacity>


      {/* Switch to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
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
});

export default SignIn;