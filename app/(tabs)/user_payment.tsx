import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
const paymentOptions = [
  { label: 'Enter UPI id', icon: require('../../assets/images/upi.png') },
  { label: 'Google Pay', icon: require('../../assets/images/googlepay.png') },
  { label: 'Paytm', icon: require('../../assets/images/paytm.png') },
];

// Deep links for payment apps
const paymentAppLinks = {
  'Google Pay': (upiId: string, amount: number) => {
    return `tez://upi/pay?pa=${upiId}&pn=RecipientName&am=${amount}&cu=INR`;
  },
  'Paytm': (upiId: string, amount: number) => {
    return `paytmmp://upi/pay?pa=${upiId}&pn=RecipientName&am=${amount}&cu=INR`;
  },
  'Enter UPI id': (upiId: string, amount: number) => {
    return `upi://pay?pa=${upiId}&pn=RecipientName&am=${amount}&cu=INR`;
  }
};

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState('Enter UPI id');
  const [upiId, setUpiId] = useState('');
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);
  const [isCheckingOrderStatus, setIsCheckingOrderStatus] = useState(true);
  
  const route = useRoute();
  const params = useLocalSearchParams();
  // const totalAmount = (route.params as { totalAmount?: number })?.totalAmount ?? 0;
  const totalAmount = params.amount; // Get orderId from params
   
  

  useEffect(() => {
    const checkOrderAccepted = async () => {
      try {
        // Simulate network request (replace with actual API polling)
        setTimeout(() => {
          setIsOrderAccepted(true); // Assume accepted after 5 seconds
          setIsCheckingOrderStatus(false);
        }, 5000);
      } catch (error) {
        console.error('Error checking order status', error);
        setIsCheckingOrderStatus(false);
      }
    };
  
    checkOrderAccepted();
  }, []);
  


  const isValidUpi = (id: string) => /^[\w.-]+@[\w.-]+$/.test(id);

  const handlePayment = async () => {
    let upiIdToUse;
    switch (selectedOption) {
      case 'Google Pay':
        upiIdToUse = '8015636015@ptsbi';
        break;
      case 'Paytm':
        upiIdToUse = '8015636015@ptsbi';
        break;
      case 'Enter UPI id':
        upiIdToUse = upiId;
        break;
      default:
        upiIdToUse = null;
    }

    if (!upiIdToUse || !isValidUpi(upiIdToUse)) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI ID.');
      return;
    }

    try {
      const deepLink = paymentAppLinks[selectedOption](upiIdToUse, totalAmount);
      const supported = await Linking.canOpenURL(deepLink);

      if (supported) {
        await Linking.openURL(deepLink);
      } else {
        const upiLinkFallback = `upi://pay?pa=${upiIdToUse}&pn=RecipientName&am=${totalAmount}&cu=INR`;
        await Linking.openURL(upiLinkFallback);
      }
    } catch (error) {
      console.error('Error opening payment app:', error);
      Alert.alert('Error', 'Failed to open payment app.');
    }
  };

  const handleBack = () => {
      router.replace('/user_invoice'); 
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <TouchableOpacity onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment Mode</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {paymentOptions.map((option) => (
          <View key={option.label} style={styles.optionWrapper}>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSelectedOption(option.label)}
              activeOpacity={0.8}
            >
              <View style={styles.outerCircle}>
                {selectedOption === option.label && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioText}>{option.label}</Text>
              <Image source={option.icon} style={styles.icon} resizeMode="contain" />
            </TouchableOpacity>

            {selectedOption === 'Enter UPI id' && option.label === 'Enter UPI id' && (
              <TextInput
                placeholder="yourname@bank"
                value={upiId}
                onChangeText={setUpiId}
                style={styles.input}
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          </View>
        ))}

        <Text style={styles.amountText}>Total Amount: ₹{totalAmount}</Text>
      </ScrollView>

      <View style={styles.buttonCard}>
  {isCheckingOrderStatus ? (
    <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#aaa' }]} disabled={true}>
      <Text style={styles.nextButtonText}>Waiting for Shop Owner...</Text>
    </TouchableOpacity>
  ) : isOrderAccepted ? (
    <TouchableOpacity style={styles.nextButton} onPress={handlePayment}>
      <Text style={styles.nextButtonText}>Pay Now</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[styles.nextButton, { backgroundColor: '#aaa' }]} disabled={true}>
      <Text style={styles.nextButtonText}>Order not accepted</Text>
    </TouchableOpacity>
  )}
</View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2f4b5b',
    paddingTop: 70,
    paddingBottom: 70,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  optionWrapper: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2f4b5b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2f4b5b',
  },
  radioText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#2f4b5b',
  },
  icon: {
    width: 28,
    height: 28,
  },
  input: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 4,
    color: '#000',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2f4b5b',
    textAlign: 'center',
  },
  buttonCard: {
    backgroundColor: '#f4f4f4',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#2f4b5b',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentPage;