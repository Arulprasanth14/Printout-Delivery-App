import { router } from "expo-router";
import * as React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const Dashboard = () => {
  const handleBack = () => {
    router.replace('/user_service');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.separator} />

      {/* Customer Service Row */}
      <View style={styles.row}>
        <TouchableOpacity onPress={handleBack} style={styles.button}>
          <View style={styles.innerRow}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../../assets/images/Online Support.png")}
            />
            <Text style={styles.label}>Customer Service</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Version Row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.innerRow}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../../assets/images/Versions.png")}
            />
            <Text style={styles.label}>Version 22.16.01</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfcfc",
    width: 362,
    height: 416,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    fontSize: 23,
    color: "#696969",
    marginBottom: 20,
  },
  separator: {
    borderTopWidth: 1,
    borderColor: "#696969",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    paddingVertical: 5,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#696969",
  },
});

export default Dashboard;
