import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '../../context/userContext'; // Import the UserContext
import axios from 'axios'; 

const PrintoutPage = () => {
  // Add at top
  const { userId } = useUser();

const handleInvoiceNavigate = async () => {
  try {
    const response = await axios.post('http://192.168.200.134:5000/api/orders/orders', { // Change URL to your backend
      userId: userId,
      orderType: 'printout',
      details: {
        size: paperSize.toLowerCase(), // "A4" → "a4"
        colorType: color.toLowerCase().replace(/ /g, '_'), // "Black and white" → "black_and_white"
        paperType: paperType.toLowerCase().replace(/ \/ /g, '_').replace(/ /g, '_'), // "Thick / Matte" → "thick_matte"
        sideType: sides.toLowerCase().includes('single') ? 'single' : 'double',
        copies: parseInt(copies),
        filePath: 'uploads/yourfile.pdf' // Set your uploaded file path here
      }
    });

    if (response.status === 201) {
      Alert.alert('Success', 'Order created successfully');
      router.push({ pathname: '/user_invoice', params: { from: 'printout', total:response.data.order.totalAmount } });
    } else {
      Alert.alert('Error', 'Failed to create order');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Something went wrong');
  }
};


  const handleBack = () => {
    router.replace('/User_Home'); 
  };

  const [paperSize, setPaperSize] = useState<string>('A4');
  const [color, setColor] = useState<string>('Black and white');
  const [paperType, setPaperType] = useState<string>('Standard');
  const [sides, setSides] = useState<string>('Single side');
  const [copies, setCopies] = useState<string>('1');

  const renderOptions = (options: string[], selected: string, onSelect: (value: string) => void) => {
    return options.map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.radioContainer}
        onPress={() => onSelect(option)}
      >
        <View style={styles.outerCircle}>
          {selected === option && <View style={styles.innerCircle} />}
        </View>
        <Text style={styles.radioText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Printout</Text>
        <View style={{ width: 32 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Attach Button */}
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachText}>+ Attach</Text>
        </TouchableOpacity>

        {/* Section: Paper Size */}
        <Text style={styles.sectionTitle}>What size do you need?</Text>
        {renderOptions(['A4', 'A3', 'A2', 'A5'], paperSize, setPaperSize)}

        <View style={styles.divider} />

        {/* Section: Color */}
        <Text style={styles.sectionTitle}>Black and White or color?</Text>
        {renderOptions(['Black and white', 'Colour'], color, setColor)}

        <View style={styles.divider} />

        {/* Section: Paper Type */}
        <Text style={styles.sectionTitle}>Paper Type?</Text>
        {renderOptions(['Standard', 'Thick / Matte', 'Glossy', 'Textured'], paperType, setPaperType)}

        <View style={styles.divider} />

        {/* Section: Sides */}
        <Text style={styles.sectionTitle}>Single side or Double side?</Text>
        {renderOptions(['Single side', 'Double side'], sides, setSides)}

        <View style={styles.divider} />

        {/* Section: Number of Copies */}
        <Text style={styles.sectionTitle}>Number of copies?</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setCopies((prev) => {
                const newValue = parseInt(prev) > 1 ? (parseInt(prev) - 1).toString() : prev;
                return newValue;
              })
            }
          >
            <Text style={styles.counterSymbol}>−</Text>
          </TouchableOpacity>

          <Text style={styles.copyCount}>{copies}</Text>

          <TouchableOpacity
            style={styles.counterButton}
            onPress={() =>
              setCopies((prev) => {
                const newValue = parseInt(prev) < 20 ? (parseInt(prev) + 1).toString() : prev;
                return newValue;
              })
            }
          >
            <Text style={styles.counterSymbol}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <Pressable
            style={styles.nextButton}
            onPress={() => handleInvoiceNavigate()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrintoutPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2f4b5b',
    paddingTop: 50,
    paddingBottom: 90,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: 'white',
    top:40,
    fontSize: 40,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  attachButton: {
    backgroundColor: '#2f4b5b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  attachText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2f4b5b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2f4b5b',
  },
  radioText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#2f4b5b',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  counterButton: {
    backgroundColor: '#2f4b5b',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  counterSymbol: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  copyCount: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
  },
});
