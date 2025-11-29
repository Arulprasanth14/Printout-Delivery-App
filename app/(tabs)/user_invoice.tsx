import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InvoiceLayout = () => {
  const [charges, setCharges] = useState(0);
  const [gst, setGst] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(40);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const fromPage = params.from; // 'spiral' or 'lamination'
  const totalAmount = params.total; // Get orderId from params

  useEffect(() => {
    const fetchData = () => {
      if (params && params.total) {
        const total = parseFloat(params.total); //  Convert to number
        setCharges(total);
        setGst(total * 0.18);
      }
    };
    console.log('Order Details:', params);
    fetchData();
  }, [totalAmount]);
  

  const handleBack = () => {
    if (fromPage === 'spiral') {
      router.replace('/user_sprial'); // go back to Spiral page
    } else if (fromPage === 'lamination') {
      router.replace('/user_lamination'); // go back to Lamination page
    } else if (fromPage === 'Photocopy') {
      router.replace('/user_photocopy'); // go back to Lamination page
    } else if (fromPage === 'printout') {
      router.replace('/user_printout'); // go back to Lamination page
    } else {
      router.back(); // default: just go back
    }
  };

  const totalCharges = (charges ?? 0) + (gst ?? 0) + (deliveryFee ?? 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={32} color="#fff" onPress={handleBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice</Text> {/* Displaying fromPage */}
      </View>

      {/* Output Boxes */}
      {loading ? (
        <ActivityIndicator size="large" color="#395364" style={{ marginTop: 50 }} />
      ) : (
        <>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Charges: ₹{charges}</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>GST tax: ₹{gst}</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Delivery fee: ₹{deliveryFee}</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Total charges: ₹{totalCharges}</Text>
          </View>
        </>
      )}

      {/* Next Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={()=>router.push({ pathname: '/user_payment' ,params:{amount: totalCharges}})} style={styles.nextButton} disabled={loading}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#395364',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 18,
    position: 'relative',
    marginBottom: 32,
  },
  backButton: {
    position: 'absolute',
    left: 18,
    top: 70,
    zIndex: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '700',
    marginTop: 23,
    marginBottom: 22,
  },
  inputBox: {
    width: 340,
    height: 70,
    backgroundColor: '#ebeff2',
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 18,
    paddingLeft: 20,
    alignSelf: 'center',
  },
  inputLabel: {
    color: '#6c6c6c',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    width: 320,
    height: 50,
    backgroundColor: '#2a3440',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default InvoiceLayout;
