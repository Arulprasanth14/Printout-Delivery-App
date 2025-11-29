import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const ServiceScreen = () => {

  const handleBack = () => {
    router.replace('/User_Home'); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Service</Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>About Our Service:</Text>
        <Text style={styles.paragraph}>
          Welcome to Printflyers! We specialize in delivering high-quality
          printouts straight to your doorstep within 2–4 hours. Our goal is to
          provide a seamless and fast printing experience for our customers.
        </Text>

        <Text style={styles.sectionTitle}>Order & Delivery:</Text>
        <View style={styles.bulletGroup}>
          <Text style={styles.bullet}>• Orders are processed immediately after confirmation.</Text>
          <Text style={styles.bullet}>• Delivery time is typically within 2–4 hours based on your location.</Text>
          <Text style={styles.bullet}>• Ensure that the uploaded documents are correct, as we print exactly what you submit.</Text>
        </View>

        <Text style={styles.sectionTitle}>Print Quality & Responsibility:</Text>
        <View style={styles.bulletGroup}>
          <Text style={styles.bullet}>
            • We strive for the highest quality prints, but we are not responsible for any issues related to the content, formatting, or resolution of your uploaded files.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Refund & Return Policy:</Text>
        <View style={styles.bulletGroup}>
          <Text style={styles.bullet}>• All sales are final.</Text>
          <Text style={styles.bullet}>• We do not accept returns or provide refunds once the order is printed and delivered.</Text>
          <Text style={styles.bullet}>• If you have any concerns, contact us immediately after delivery, and we will try our best to assist you.</Text>
        </View>

        <Text style={styles.sectionTitle}>Contact Us:</Text>
        <Text style={styles.paragraph}>
          Email: printflyer@gmail.com{'\n'}
          Contact us during working hours. We’re here to support you.
        </Text>
      </ScrollView>

      {/* Sticky Thank You Button */}
      <View style={styles.footer}>
        
          <TouchableOpacity onPress={() => handleBack()}
          style={styles.thankYouButton}>
            <Text style={styles.buttonText}>Thank you</Text>
          </TouchableOpacity>
        
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2a4658',
    height: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginRight: 30, // push center text due to left icon
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a2a2a',
    marginBottom: 6,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 14,
    color: '#3e3e3e',
    lineHeight: 22,
  },
  bulletGroup: {
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 14,
    color: '#3e3e3e',
    lineHeight: 22,
    marginBottom: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  thankYouButton: {
    backgroundColor: '#2a3440',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ServiceScreen;