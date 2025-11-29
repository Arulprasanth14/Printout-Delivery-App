import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
  Dimensions,
  Animated,
} from 'react-native';
import SideMenu from './menu';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Home');
  const slideAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [statusButtonsVisible, setStatusButtonsVisible] = useState({});
  const [clickedStatus, setClickedStatus] = useState({});



  useEffect(() => {
    if (!isDataLoaded) {
      const mockOrders = [
        {
          id: 1,
          customer: 'John Doe',
          details: '3x A4 Color Print, 2x B&W',
          orderTime: '2025-04-23 10:30 AM',
          deliveryAddress: '123 Main Street, Chennai',
          documentType: 'PDF',
          totalCost: '₹150',
          fileUrl: 'https://example.com/order1.pdf',
        },
        {
          id: 2,
          customer: 'Jane Smith',
          details: '5x Passport Photos',
          orderTime: '2025-04-23 11:00 AM',
          deliveryAddress: '456 College Road, Bangalore',
          documentType: 'JPG',
          totalCost: '₹80',
          fileUrl: 'https://example.com/order2.jpg',
        },
      ];
      
      setOrders(mockOrders);
      setIsDataLoaded(true);
    }
  }, [isDataLoaded]);

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 280,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleMenuSelect = (label) => {
    setActiveScreen(label);
    toggleMenu();
  };

  const handleStatusClick = (orderId, status) => {
    setClickedStatus(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [status]: true,
      }
    }));
  };
  

  const handleLogout = () => {
    setActiveScreen('Home');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handleSave = () => setActiveScreen('Home');
  const handleChangePassword = () => navigation.navigate('ChangePassword');

  const handleAcceptOrder = (orderId) => {
    const acceptedOrder = orders.find(order => order.id === orderId);
    if (acceptedOrder) {
      setAcceptedOrders(prev => [...prev, acceptedOrder]);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    }
  };
  

  const handleDeclineOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const handleUpdateOrderStatus = (orderId) => {
    setStatusButtonsVisible(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  

  const renderHeaderIcon = () => {
    switch (activeScreen) {
      case 'Profile':
        return require('../assets/account_circle.png');
      case 'Edit Profile':
        return require('../assets/settings.png');
      case 'Customer Care':
        return require('../assets/Phone.png');
      case 'About Us':
        return require('../assets/File.png');
      case 'Orders':
        return require('../assets/Shopping_cart.png');
      default:
        return require('../assets/Home.png');
    }
  };

  const renderHeaderText = () => activeScreen;
  const renderOrdersView = () => (
    <ScrollView contentContainerStyle={styles.orderContainer}>
      {acceptedOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderText}>Customer: {order.customer}</Text>
          <Text style={styles.orderText}>Details: {order.details}</Text>
          
          
          
        </View>
      ))}
    </ScrollView>
  );
  
  
  const renderHomeView = () => (
    <ScrollView contentContainerStyle={styles.orderContainer}>
      {orders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderText}>Customer: {order.customer}</Text>
          <Text style={styles.orderText}>Details: {order.details}</Text>
          <View style={styles.orderButtons}>
            <Button title="Accept" onPress={() => handleAcceptOrder(order.id)} />
            <Button title="Decline" onPress={() => handleDeclineOrder(order.id)} />
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderOrderStatusView = () => (
    <ScrollView contentContainerStyle={styles.orderContainer2}>
      {acceptedOrders.map((order) => {
        const isDelivered = clickedStatus[order.id]?.delivered;
  
        return (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderText}>Accepted: {order.customer}</Text>
            <Text style={styles.orderText}>Details: {order.details}</Text>
  
            <Button
              title="Update Order Status"
              onPress={() => handleUpdateOrderStatus(order.id)}
              disabled={isDelivered} // 🔒 disables button if delivered
              color={isDelivered ? 'gray' : undefined} // optional: gray out button
            />
  
            {statusButtonsVisible[order.id] && !isDelivered && (
              <View style={styles.statusButtonsContainer}>
                {!clickedStatus[order.id]?.onProcess && (
                  <TouchableOpacity
                    style={styles.statusButton}
                    onPress={() => handleStatusClick(order.id, 'onProcess')}
                  >
                    <Text style={styles.statusButtonText}>On Process</Text>
                  </TouchableOpacity>
                )}
  
                {clickedStatus[order.id]?.onProcess && !clickedStatus[order.id]?.readyToShip && (
                  <TouchableOpacity
                    style={styles.statusButton}
                    onPress={() => handleStatusClick(order.id, 'readyToShip')}
                  >
                    <Text style={styles.statusButtonText}>Ready to Ship</Text>
                  </TouchableOpacity>
                )}
  
                {clickedStatus[order.id]?.readyToShip && !clickedStatus[order.id]?.delivered && (
                  <TouchableOpacity
                    style={styles.statusButton}
                    onPress={() => handleStatusClick(order.id, 'delivered')}
                  >
                    <Text style={styles.statusButtonText}>Deliver to Delivery Person</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
  
  
  

  return (
    
    <View style={styles.container}>
      <Animated.View
        style={[styles.sideMenu, {
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, 280],
              outputRange: [-280, 0],
            }),
          }],
        }]}
      >
        <SideMenu onSelect={handleMenuSelect} />
      </Animated.View>

      <Animated.View style={[styles.mainContent, { marginLeft: slideAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('../assets/Details.png')} style={styles.iconImage} resizeMode="contain" />
          </TouchableOpacity>

          <View style={styles.centerHeader}>
            <Image source={renderHeaderIcon()} style={styles.headerIcon} resizeMode="contain" />
            <Text style={styles.headerText}>{renderHeaderText()}</Text>
          </View>

          <Image source={require('../assets/PrintFlyers_logo_4.png')} style={styles.logoImage} resizeMode="contain" />
        </View>

        {activeScreen === 'Home' && (
          <View style={styles.deliveryWrapper}>
            <Image source={require('../assets/delivery.png')} style={styles.deliveryImage} resizeMode="contain" />
          </View>
        )}

        {['Profile', 'Edit Profile'].includes(activeScreen) && (
          <ScrollView contentContainerStyle={styles.overlayContent}>
            <Image source={require('../assets/Male_User.png')} style={styles.profileImage} resizeMode="contain" />

            <View style={styles.inputContainer}>
              <Text style={styles.label}> Name</Text>
              {activeScreen === 'Profile' ? (
                <Text style={styles.fixedText}>John Doe</Text>
              ) : (
                <TextInput style={styles.input} defaultValue="John Doe" />
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Shop Name</Text>
              {activeScreen === 'Profile' ? (
                <Text style={styles.fixedText}>PrintFlyers Outlet</Text>
              ) : (
                <TextInput style={styles.input} defaultValue="PrintFlyers Outlet" />
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Contact Number</Text>
              {activeScreen === 'Profile' ? (
                <Text style={styles.fixedText}>+91 9876543210</Text>
              ) : (
                <TextInput style={styles.input} defaultValue="+91 9876543210" />
              )}
            </View>

            {activeScreen === 'Edit Profile' && (
              <TouchableOpacity onPress={handleChangePassword}>
                <Text style={styles.changePasswordText}>Change Password</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={activeScreen === 'Edit Profile' ? handleSave : handleLogout} style={styles.logoutBtn}>
              <Text style={styles.logoutText}>{activeScreen === 'Edit Profile' ? 'Save' : 'Logout'}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

{activeScreen === 'About Us' && (
  <ScrollView contentContainerStyle={styles.aboutUsContainer}>
    <Text style={styles.aboutHeading}>✨ About Our Service</Text>
    <Text style={styles.aboutText}>
      Welcome to PrintFlyers, your trusted partner in simplifying printout delivery services.{"\n\n"}
      As a shop owner, you play a vital role in bringing fast, reliable, and high-quality printing solutions directly to customers' doors.{"\n\n"}
      Our platform is designed to make managing orders easy — from receiving customer requests to printing and handing over to delivery personnel.
    </Text>

    <Text style={styles.aboutHeading}>📦 Order & Delivery</Text>
    <Text style={styles.aboutText}>
      Orders are processed immediately after confirmation.{"\n\n"}
      Delivery time is typically within 2–4 hours based on customer location.{"\n\n"}
      Ensure that the uploaded documents are correct — we print exactly what customers submit.
    </Text>

    <Text style={styles.aboutHeading}>🖨️ Print Quality & Responsibility</Text>
    <Text style={styles.aboutText}>
      ✅ High-Resolution Output – Clear, crisp text and images{"\n\n"}
      ✅ Proper Color Management – Accurate color matching for color prints{"\n\n"}
      ✅ Neat Paper Handling – No creases, smudges, or faded areas{"\n\n"}
      ✅ Correct Print Format – As per the customer’s requirements (A4, A3, etc.){"\n\n"}
      ✅ Finishing Touches – Proper cutting, stapling, or binding if requested{"\n\n"}
      ⚠️ Report Issues to Admin – If any printing or delivery issue occurs
    </Text>

    <Text style={styles.aboutHeading}>🔁 Refund & Return Policy</Text>
    <Text style={styles.aboutText}>
      All sales are final.{"\n\n"}
      We do not accept returns or provide refunds once the order is printed and delivered.{"\n\n"}
      If you have any concerns, contact us immediately after delivery, and we will try our best to assist you.
    </Text>
  </ScrollView>
  
)}


{activeScreen === "Customer Care" && (
          <ScrollView contentContainerStyle={styles.overlayContent}>
            <Text style={styles.aboutHeading}>Customer Care</Text>
            <Text style={styles.aboutText}>
              For any inquiries, reach out to our support team:{"\n\n"}
              📧 Email: printflyer@gmail.com{"\n\n"}
              Contact us during working hours using this email.{"\n\n"}
              We’re here to support you.{"\n\n"}
              Thank you for choosing PrintFlyers! We appreciate your support.{"\n\n"}
              🙏 THANK YOU
            </Text>
          </ScrollView>
        )}



        {activeScreen === 'Home' && renderHomeView()}
        {activeScreen === 'Home' && renderOrderStatusView()}
        {activeScreen === 'Orders' && (
  <>
    <View style={styles.deliveryWrapper}>
      <Image source={require('../assets/delivery.png')} style={styles.deliveryImage} resizeMode="contain" />
    </View>
    {renderOrdersView()}
  </>
)}

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 280,
    zIndex: 10,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  header: {
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
  iconImage: { width: 45, height: 45 },
  logoImage: { width: 200, height: 60 },
  centerHeader: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: { width: 45, height: 45, marginRight: 6 },
  headerText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  deliveryWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  deliveryImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
  overlayContent: {
    padding: 20,
    alignItems: "center",
    paddingBottom: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 24,
    alignSelf: "center",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
    alignSelf: "center",
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
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebeff2",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginLeft: -34,
    tintColor: "#37546a",
  },
  fixedText: {
    fontSize: 18,
    color: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ebeff2",
    borderRadius: 10,
  },
  logoutBtn: {
    backgroundColor: "#37546a",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginTop: 30,
    alignSelf: "center",
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  aboutText: {
    fontSize: 24,
    color: "#3E4349",
    lineHeight: 28,
    marginBottom: 20,
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 20,
  },
  aboutHeading: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3E4349",
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 20,
  },
  orderScroll: {
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 24,
  flexDirection:"row",
},

  orderContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "left",
    justifyContent: "flex-start",
    padding: 24,
  },
  orderContainer2: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end", // aligns children to the right
    justifyContent: "flex-start",
    padding: 24,
  },
  
  orderCard: {
    backgroundColor: 'white', // ✨ semi-transparent white
    borderRadius: 12,
    padding: 16,
    width: '100%',
    maxWidth: 500,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    
  },
  
  
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  orderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButtonsContainer: {
    marginTop: 10,
  },
  statusButton: {
    backgroundColor: '#37546a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  
});

export default HomeScreen 