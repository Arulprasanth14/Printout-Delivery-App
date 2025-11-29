

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {

  const router = useRouter();
  const params = useLocalSearchParams();
  const fromPage = params.from;

  const handleOrderNavigate = () => {
    router.push({ pathname: '/user_order', params: { from: 'profile' } });
  };
  
  const handleBack = () => {
    if (fromPage === 'home') {
      router.replace('/User_Home');
    } else if (fromPage === 'order') {
      router.replace('/user_order');
    }else {
      router.replace('/User_Home'); 
    }
  };


  const [name, setName] = useState('Arul');
  const [email, setEmail] = useState('arulap14@gmail.com');
  const [mobile, setMobile] = useState('8003456776');
  const [address, setAddress] = useState('Chennai');
  const [isEditing, setIsEditing] = useState(false);

  const BottomNavigation = () => (
    <View style={styles.bottomNav}>

      <TouchableOpacity style={styles.navButton}
      onPress={() => router.push("/User_Home")}
      >
        <Image
          source={require('../../assets/images/nav_Home.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}
      onPress={() => handleOrderNavigate()}
      >
        <Image
          source={require('../../assets/images/nav_Shopping_Cart.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Image
          source={require('../../assets/images/cur_User.png')}
          style={styles.navIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => handleBack()}>
            <Image
              source={require('../../assets/images/Back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.profileTitle}>Profile</Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Image
              source={require('../../assets/images/Pen_Squared.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <Image
          source={require('../../assets/images/Test_Account.png')}
          style={styles.profileImage}
        />

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Name */}
          <View style={styles.fieldContainer}>
            <Text style={styles.infoLabel}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBox}
                value={name}
                onChangeText={setName}
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {isEditing && <View style={styles.activeIndicator} />}
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={styles.infoLabel}>Email-ID</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {isEditing && <View style={styles.activeIndicator} />}
            </View>
          </View>

          {/* Mobile */}
          <View style={styles.fieldContainer}>
            <Text style={styles.infoLabel}>Mobile</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBox}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {isEditing && <View style={styles.activeIndicator} />}
            </View>
          </View>

          {/* Address */}
          <View style={styles.fieldContainer}>
            <Text style={styles.infoLabel}>Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.inputBox, styles.addressInput]}
                value={address}
                onChangeText={setAddress}
                multiline
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {isEditing && <View style={styles.activeIndicator} />}
            </View>
          </View>
        </View>

        {/* Save Changes Button (only in edit mode) */}
        {isEditing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            console.log('Logged out');
            // navigation.replace('Login');
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Render bottom navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 100, // To avoid overlap with bottom navigation
  },
  header: {
    width: width,
    height: height * 0.25,
    backgroundColor: '#37546a',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  editButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  editIcon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  profileTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: '#fff',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#ebeff2',
  },
  infoSection: {
    width: '90%',
    marginTop: 60,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a3440',
    marginLeft: 15,
    marginBottom: 5,
  },
  inputContainer: {
    position: 'relative',
  },
  inputBox: {
    width: '100%',
    height: 55,
    backgroundColor: '#ebeff2',
    borderRadius: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#2a3440',
    borderWidth: 1,
    borderColor: '#d5dde0',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#ef5334',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  addressInput: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '90%',
    height: 55,
    backgroundColor: '#ef5334',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  logoutButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#d9534f',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    padding: 10,
  },
  navIcon: {
    width: 35,
    height: 35,
  },
});
