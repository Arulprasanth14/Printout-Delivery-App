import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library you prefer

const OTPVerification = () => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = React.useState('');

  const handleGetOTP = () => {
    // Implement your OTP logic here
    console.log('Getting OTP for:', mobileNumber);
    // After getting OTP, you might navigate to OTP entry screen:
    // navigation.navigate('OTPEntry', { mobileNumber });
  };

  return (
    <View style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>OTP verification</Text>
      </View>

      {/* Content area */}
      <View style={styles.content}>
        {/* Mobile input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your mobile number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        {/* Get OTP button */}
        <TouchableOpacity 
          style={styles.otpButton} 
          onPress={handleGetOTP}
          activeOpacity={0.8}
        >
          <Text style={styles.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100, // Adjust as needed
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  inputField: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ebeff2',
    borderRadius: 20,
    backgroundColor: '#ebeff2',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
  },
  otpButton: {
    height: 55,
    borderRadius: 20,
    backgroundColor: '#2a3440',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  otpButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default OTPVerification;