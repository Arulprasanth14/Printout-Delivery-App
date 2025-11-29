import * as React from "react";
import { StyleSheet, View, Text, Image,TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from 'expo-router';
import axios, { AxiosError } from 'axios';
import { useUser } from '../../context/userContext';
interface UserRegistrationData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  address: string;
}

const Register = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBack = () => {
    router.replace('/user_sign_in'); 
  };

  const handleApiError = (error: unknown): string => {
    let errorMessage = "An error occurred. Please try again.";
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("API Error:", errorMessage);
    return errorMessage;
  };

  const validateInputs = (): boolean => {
    if (!username || !email || !mobile || !password || !confirmPassword || !address) {
      Alert.alert("Error", "Please fill all fields including address");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }

    if (mobile.length < 10) {
      Alert.alert("Error", "Please enter a valid mobile number");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    const registrationData: UserRegistrationData = {
      name: username,
      email,
      mobile,
      password,
      confirmPassword,
      address,
    };

    try {
      const response = await axios.post(
        "http://192.168.200.134:5000/api/users/register",
        registrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Registration successful");
        router.push('/user_sign_in');
      }
    } catch (error: unknown) {
      const errorMessage = handleApiError(error);
      Alert.alert("Registration failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.register}>
      {/* Background */}
      <View style={styles.registerChild} />
      <View style={[styles.signInItem, styles.signPosition]} />
      <View style={[styles.signInInner, styles.signPosition]} />
      {/* Input Fields */}
      <TextInput
        style={[styles.inputField, { top: 265 }]}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.inputField, { top: 344 }]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.inputField, { top: 422 }]}
        value={mobile}
        onChangeText={setMobile}
        placeholder="Mobile"
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.inputField, { top: 501 }]}
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
        <TextInput
        style={[styles.inputField, { top: 580 }]}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
      />
      
      <TouchableOpacity
        style={[styles.eye, { top: 590 }]}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <Image
          style={styles.eyeIcon}
          resizeMode="contain"
          source={
            passwordVisible
              ? require("../../assets/images/Eye.png")
              : require("../../assets/images/Eye_close.png")
          }
        />
      </TouchableOpacity>
      
      <TextInput
  style={[styles.inputField, { top: 660 }]}
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  placeholder="Confirm Password"
  secureTextEntry={!confirmPasswordVisible}
/>

<TouchableOpacity
  style={[styles.eye, { top: 670 }]}
  onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
>
  <Image
    style={styles.eyeIcon}
    resizeMode="contain"
    source={
      confirmPasswordVisible
        ? require("../../assets/images/Eye.png")
        : require("../../assets/images/Eye_close.png")
    }
  />
</TouchableOpacity>


      {/* Sign in and Register Links */}
      <View style={styles.signInRegister}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={[styles.signIn1, styles.signIn1Typo]}>Sign in</Text>
        </TouchableOpacity>
        <Text style={[styles.registerLink, styles.signIn1Typo]}>Register</Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.registerText}>
          {isLoading ? "Processing..." : "Register"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.letsGetYou}>Let’s get you to registered!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    backgroundColor: "#fcfcfc",
    flex: 1,
    position: 'relative',
  },
  registerChild: {
    top: 0,
    left: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "#37546a",
    width: 421,
    height: 173,
    position: "absolute"
  },
  inputField: {
    position: "absolute",
    left: 30,
    width: "80%",
    height: 50,
    backgroundColor: "#ebeff2",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  signInItem: {
    width: 341,
    backgroundColor: "#ebeff2",
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170
  },
  signPosition: {
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170,
    left: "50%",
    position: "absolute"
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  eye: {
    position: "absolute",
    left: 325, // or adjust as needed
    width: 30,
    height: 30,
  },
  
  signInRegister: {
    position: "absolute",
    top: 180,
    left: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  signInInner: {
    backgroundColor: "#ef5334",
    width: 185,
    height: 60,
    borderRadius: 28,
    top: 142,
    marginLeft: -170,
  },
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
  signIn1: {
     left: 70, width: 69, color: "#fcfcfc"
  },
  registerLink: {  // Renamed from 'register' to 'registerLink'
    left: 220, color: "#696969", width: 83 
  },
  signIn1Typo: {
    height: 29,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    top: -18,
    
    textAlign: "center",
    position: "absolute"
  },
  registerButton: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    marginLeft: -100,
    backgroundColor: "#2a3440",
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 20,
  },
  registerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Register;
