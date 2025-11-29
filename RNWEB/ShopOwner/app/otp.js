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

const OTP = () => {
  const navigation = useNavigation();

  const [otpDigits, setOtpDigits] = React.useState(["", "", "", ""]);
  const inputsRef = [];

  const [showPasswordFields, setShowPasswordFields] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [otpSentMessage, setOtpSentMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [timer, setTimer] = React.useState(30);
  const [canResend, setCanResend] = React.useState(false);

  const handleOtpChange = (text, index) => {
    const newDigits = [...otpDigits];
    newDigits[index] = text;
    setOtpDigits(newDigits);

    if (text && index < 3) {
      inputsRef[index + 1]?.focus(); // Auto move to next input
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;

    setOtpDigits(["", "", "", ""]);
    inputsRef[0]?.focus();

    setOtpSentMessage("OTP sent successfully");
    setCanResend(false); // Disable resend
    setTimer(30); // Reset timer

    setTimeout(() => {
      setOtpSentMessage("");
    }, 3000);
  };

  const handleConfirm = () => {
    const completeOtp = otpDigits.join("");
    const isOtpValid = /^[0-9]{4}$/.test(completeOtp);

    if (!showPasswordFields) {
      if (isOtpValid) {
        setShowPasswordFields(true);
      }
    } else {
      if (!password || !confirmPassword) {
        setPasswordError("Password fields cannot be empty");
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        return;
      }

      setPasswordError("");
      navigation.navigate("Login");
    }
  };

  const isOtpComplete = otpDigits.every((digit) => digit !== "");

  React.useEffect(() => {
    let interval;
    if (!canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Left.png")}
            style={styles.leftIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>OTP Verification</Text>

        <Image
          source={require("../assets/PrintFlyers_logo_4.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {!showPasswordFields && (
        <View style={styles.otpBoxContainer}>
          <Text style={styles.label}>Enter OTP</Text>
          <View style={styles.otpInputs}>
            {otpDigits.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="numeric"
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                ref={(ref) => (inputsRef[index] = ref)}
              />
            ))}
          </View>

          <View style={styles.resendSection}>
            <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
              <Text style={[styles.resendText, !canResend && { color: "#999" }]}>
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
              </Text>
            </TouchableOpacity>
            {otpSentMessage ? (
              <Text style={styles.otpSentMessage}>{otpSentMessage}</Text>
            ) : null}
          </View>
        </View>
      )}

      {showPasswordFields && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
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
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </>
      )}

      <TouchableOpacity
        style={[
          styles.otpButton,
          !isOtpComplete && !showPasswordFields && { backgroundColor: "#ccc" },
        ]}
        onPress={handleConfirm}
        disabled={!isOtpComplete && !showPasswordFields}
      >
        <Text style={styles.otpText}>Confirm</Text>
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
  otpBoxContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 40,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 10,
    fontWeight: "500",
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#ebeff2",
    borderRadius: 10,
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  resendSection: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  resendText: {
    color: "#2a3440",
    fontWeight: "500",
    fontSize: 14,
  },
  otpSentMessage: {
    fontSize: 14,
    color: "green",
    marginTop: 6,
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginTop: 30,
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ebeff2",
    paddingHorizontal: 16,
    fontSize: 16,
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
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
    marginTop: 30,
  },
  otpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default OTP;
