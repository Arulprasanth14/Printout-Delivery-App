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
  const [mobile, setMobile] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Left.png")}
            style={styles.leftIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Centered Title */}
        <Text style={styles.headerTitle}>Get One Time Password</Text>

        {/* Logo (right side) */}
        <Image
          source={require("../assets/PrintFlyers_logo_4.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Mobile Number Field */}
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

        {mobileError ? (
          <Text style={styles.errorText}>{mobileError}</Text>
        ) : null}
      </View>

      {/* Get OTP Button */}
      <TouchableOpacity
  style={styles.otpButton}
  onPress={() => {
    if (mobile.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
    } else {
      setMobileError("");
      navigation.navigate("OTP");
    }
  }}
>
  <Text style={styles.otpText}>Get OTP</Text>
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
  },
  header: {
    width: "100%",
    height: 110,
    backgroundColor: "#37546a",
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "relative",
  },
  leftIcon: {
    width: 30,
    height: 30,
    marginBottom: 32,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 36,
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
    fontWeight: "600",
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 40,
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
    width: "100%",
  },
  inputError: {
    borderColor: "#EF5334",
    borderWidth: 1,
  },
  errorText: {
    color: "#EF5334",
    fontSize: 14,
    marginTop: 4,
  },
  otpButton: {
    backgroundColor: "#2a3440",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginTop: 20,
  },
  otpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignIn;
