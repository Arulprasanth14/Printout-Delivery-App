import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const SideMenu = ({ height = "100%", width = 280, onSelect }) => {
  return (
    <View style={[styles.menu, { height, width }]}>
      <Image
        source={require("../assets/Male_User.png")}
        style={styles.profileImage}
      />

      {menuItems.map(({ label, icon }, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(label)}
          style={styles.menuItem}
        >
          <Image source={icon} style={styles.icon} />
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const menuItems = [
{ label: "Home", icon: require("../assets/Home.png") },
  { label: "Profile", icon: require("../assets/account_circle.png") },
  { label: "Orders", icon: require("../assets/Shopping_cart.png") },
  { label: "Edit Profile", icon: require("../assets/settings.png") },
  { label: "Customer Care", icon: require("../assets/Phone.png") },
  { label: "About Us", icon: require("../assets/File.png") },
];

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#71aad6",
    padding: 20,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    tintColor: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default SideMenu;
