import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Dashboard from "./dashboard";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const HomePage = () => {
  const router = useRouter();

  const [showDashboard, setShowDashboard] = React.useState(false);

  const handleOutsidePress = () => {
    setShowDashboard(false);
  };

  return (
    <View style={styles.homePage}>
      {/* bottom panel */}
      <View style={[styles.homePageChild, styles.homeChildPosition1]} />

      {/* Printout card area */}
      <Pressable
        style={[styles.homePageItem, styles.homeShadowBox]}
        onPress={() => router.push("/user_printout")}
      />

      {/* Spiral binding card area */}
      <Pressable
        style={[styles.homePageInner, styles.homeShadowBox, styles.homePosition]}
        onPress={() => router.push("/user_sprial")}
      />

      {/* Lamination card area */}
      <Pressable
        style={[styles.rectangleView, styles.homeShadowBox, styles.rectangleViewPosition]}
        onPress={() => router.push("/user_lamination")}
      />

      {/* Photo copies card area */}
      <Pressable
        style={[styles.homePageChild1, styles.homeShadowBox, styles.homeChildPosition]}
        onPress={() => router.push("/user_photocopy")}
      />

      {/* small cards */}
      <View style={[styles.homePageChild2, styles.homeChildShadowBox]} />
      <View style={[styles.homePageChild3, styles.homeChildShadowBox]} />
      <View style={[styles.homePageChild4, styles.homeChildShadowBox]} />
      <View style={[styles.homePageChild5, styles.homeChildShadowBox]} />

      {/* Icons */}
      <Pressable onPress={() => router.push("/user_printout")}>
        <Image
          style={styles.printoutRemovebgPreview1Icon}
          resizeMode="cover"
          source={require("../../assets/images/printout.png")}
        />
      </Pressable>
      <Pressable onPress={() => router.push("/user_sprial")}>
        <Image
          style={styles.spiralNoteRemovebgPreview1Icon}
          resizeMode="cover"
          source={require("../../assets/images/spiral_note.png")}
        />
      </Pressable>
      <Pressable onPress={() => router.push("/user_lamination")}>
        <Image
          style={styles.laminatedCardRemovebgPrevieIcon}
          resizeMode="cover"
          source={require("../../assets/images/laminated_card.png")}
        />
      </Pressable>
      <Pressable onPress={() => router.push("/user_photocopy")}>
        <Image
          style={styles.photocopiesRemovebgPreview1Icon}
          resizeMode="cover"
          source={require("../../assets/images/photocopies.png")}
        />
      </Pressable>

      {/* Text Labels */}
      <Pressable onPress={() => router.push("/user_printout")}>
        <Text style={[styles.printout, styles.printoutTypo]}>Printout</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/user_sprial")}>
        <Text style={[styles.spiralBinding, styles.printoutTypo]}>
          Spiral binding
        </Text>
      </Pressable>
      <Pressable onPress={() => router.push("/user_lamination")}>
        <Text style={[styles.lamination, styles.printoutTypo]}>Lamination</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/user_photocopy")}>
        <Text style={[styles.photoCopies, styles.printoutTypo]}>
          Photo copies
        </Text>
      </Pressable>

      {/* header & logo */}
      <View style={[styles.homePageChild6, styles.homeChildPosition1]} />
      <Text style={styles.welcomeToOur}>{`Welcome to our\nplatform`}</Text>
      <View style={[styles.frameView, styles.frameViewPosition]} />
      <Image
        style={styles.printflyersLogo22}
        resizeMode="cover"
        source={require("../../assets/images/PrintFlyers_logo_2_2.png")}
      />

      {/* Xbox Menu */}
      <Pressable style={styles.xboxMenu} onPress={() => setShowDashboard(true)}>
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../../assets/images/Xbox_Menu.png")}
        />
      </Pressable>

      {/* Dashboard Modal */}
      <Modal transparent visible={showDashboard} animationType="fade">
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.dashboardWrapper}>
                <Dashboard />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

// ✅ Bottom Navigation Component with navigation
const BottomNavigation = () => {
  const router = useRouter();

  const handleOrderNavigate = () => {
    router.push({ pathname: '/user_order', params: { from: 'home' } });
  };

  const handleProfileNavigate = () => {
    router.push({ pathname: '/user_edit_profile', params: { from: 'home' } });
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton}>
        <Image
          source={require('../../assets/images/cur_Home.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleOrderNavigate()}
      >
        <Image
          source={require('../../assets/images/nav_Shopping_Cart.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleProfileNavigate()}
      >
        <Image
          source={require('../../assets/images/nav_User.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  homeChildPosition1: {
    width: 421,
    left: 0,
    position: "absolute",
  },
  homeShadowBox: {
    height: 100,
    width: 371,
    borderWidth: 2,
    borderColor: "#eaeff2",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 15,
    backgroundColor: "#fbfbfb",
    position: "absolute",
  },
  homePosition: { top: 387, left: 21 },
  rectangleViewPosition: { left: 20, top: 512 },
  homeChildPosition: { left: 19, top: 638 },
  homeChildShadowBox: {
    width: 110,
    backgroundColor: "#eaeff2",
    height: 100,
    borderRadius: 15,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  printoutTypo: {
    height: 24,
    color: "#3e4349",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    left: 174,
    textAlign: "left",
    fontSize: 23,
    position: "absolute",
  },
  frameViewPosition: {
    left: "51%",
    position: "absolute",
  },
  homePageChild: {
    top: 822,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 95,
    backgroundColor: "#fbfbfb",
    width: 412,
    left: 0,
  },
  homePageItem: { left: 21, top: 263 },
  homePageInner: {
    height: 100,
    width: 371,
    borderWidth: 2,
    borderColor: "#eaeff2",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 15,
    backgroundColor: "#fbfbfb",
    position: "absolute",
  },
  rectangleView: {
    height: 100,
    width: 371,
    borderWidth: 2,
    borderColor: "#eaeff2",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 15,
    backgroundColor: "#fbfbfb",
    position: "absolute",
  },
  homePageChild1: {
    height: 100,
    width: 371,
    borderWidth: 2,
    borderColor: "#eaeff2",
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 15,
    backgroundColor: "#fbfbfb",
    position: "absolute",
  },
  homePageChild2: { left: 21, top: 263 },
  homePageChild3: { top: 387, left: 21 },
  homePageChild4: { left: 20, top: 512 },
  homePageChild5: { left: 19, top: 638 },
  printoutRemovebgPreview1Icon: {
    top: 276,
    left: 25,
    height: 73,
    width: 97,
    position: "absolute",
  },
  laminatedCardRemovebgPrevieIcon: {
    top: 525,
    left: 37,
    width: 74,
    height: 74,
    position: "absolute",
  },
  photocopiesRemovebgPreview1Icon: {
    top: 645,
    left: 27,
    width: 86,
    height: 86,
    position: "absolute",
  },
  spiralNoteRemovebgPreview1Icon: {
    top: 401,
    left: 38,
    width: 72,
    height: 72,
    position: "absolute",
  },
  printout: { top: 298, width: 97 },
  spiralBinding: { top: 420, width: 156 },
  lamination: { top: 550, width: 133 },
  photoCopies: { top: 675, width: 147 },
  homePageChild6: {
    top: -1,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: "#37546a",
    height: 173,
    width: 412,
    left: 0,
  },
  welcomeToOur: {
    position: "absolute",
    top: 60,
    left: 15,
    right: 0,
    textAlign: "auto",
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    fontSize: 38,
    color: "#eaeff2",
    zIndex: 10,
  },
  frameView: {
    marginLeft: 69,
    top: 41,
    backgroundColor: "#fff",
    width: 100,
    height: 98,
    borderRadius: 15,
    left: "50%",
    overflow: "hidden",
    position: "absolute",
    zIndex: 1,
  },
  printflyersLogo22: {
    top: 50,
    left: 295,
    width: 81,
    height: 80,
    position: "absolute",
    zIndex: 2,
  },
  xboxMenu: {
    left: 24,
    top: 196,
    width: 40,
    height: 40,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  homePage: {
    backgroundColor: "#fcfcfc",
    flex: 1,
    height: 917,
    overflow: "hidden",
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardWrapper: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    paddingVertical: 1,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eaeff2',
    elevation: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default HomePage;
