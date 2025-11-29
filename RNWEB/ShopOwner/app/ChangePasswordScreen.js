import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });

  const handleSave = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/Left.png")}
            style={styles.leftIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Change Password</Text>

        <Image
          source={require("../assets/PrintFlyers_logo_4.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Password Inputs */}
      {["old", "new", "confirm"].map((key) => (
        <View style={styles.inputContainer} key={key}>
          <Text style={styles.label}>
            {key === "old"
              ? "Old Password"
              : key === "new"
              ? "New Password"
              : "Confirm New Password"}
          </Text>
          <View style={styles.passwordField}>
            <TextInput
              style={[
                styles.input,
                passwords[key] !== "" && passwords[key].length < 4
                  ? { borderColor: "#EF5334", borderWidth: 1 }
                  : null,
              ]}
              placeholder="Enter password"
              secureTextEntry={!showPassword[key]}
              value={passwords[key]}
              onChangeText={(text) =>
                setPasswords((prev) => ({ ...prev, [key]: text }))
              }
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() =>
                setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            >
              <Image
                source={
                  showPassword[key]
                    ? require("../assets/Eye.png")
                    : require("../assets/Blind.png")
                }
                style={styles.eyeImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fcfcfc",
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
    marginBottom: 30,
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
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 6,
    fontWeight: "500",
  },
  passwordField: {
    position: "relative",
    width: "100%",
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ebeff2",
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 40,
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
    tintColor: "#37546a",
  },
  saveBtn: {
    backgroundColor: "#37546a",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginTop: 20,
    alignSelf: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
