import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Lamination = () => {
  const router = useRouter();
  const handleInvoiceNavigate = () => {
    router.push({ pathname: '/user_invoice', params: { from: 'lamination' } });
  };
    const params = useLocalSearchParams();
    const fromPage = params.from; // 'spiral' or 'lamination'
    
    const handleBack = () => {
      router.replace('/User_Home'); // go back to User Home page
    };


  const [paperSize, setPaperSize] = useState('A4');
  const [color, setColor] = useState('Black and white');
  const [paperType, setPaperType] = useState('Anti glare');
  const [sides, setSides] = useState('Single side');
  const [front_page, setfront_page] = useState('Lightweight , Flexible');
  const [features, setfeatures] = useState('Waterproof lamination');
  const [copies, setCopies] = useState('1');

  const renderOptions = (options: any[], selected: string, onSelect: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
    return options.map((option) => (
      <TouchableOpacity key={option} style={styles.radioContainer} onPress={() => onSelect(option)}>
        <View style={styles.outerCircle}>
          {selected === option && <View style={styles.innerCircle} />}
        </View>
        <Text style={styles.radioText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handleBack()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Lamination</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Attach Button */}
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachText}>+ Attach</Text>
        </TouchableOpacity>

        {/* Sections */}
        <Text style={styles.sectionTitle}>What size do you need?</Text>
        {renderOptions(['A4', 'A3', 'A2', 'A5'], paperSize, setPaperSize)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Black and White or color?</Text>
        {renderOptions(['Black and white', 'Colour print '], color, setColor)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Lamination Type?</Text>
        {renderOptions(['Anti glare', 'Matte', 'Glossy'], paperType, setPaperType)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Single side or Double side?</Text>
        {renderOptions(['Single side', 'Double side '], sides, setSides)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Thickness?</Text>
        {renderOptions(['Lightweight , Flexible', 'Standard durability', 'Thicker , Sturdy'], front_page, setfront_page)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Special features?</Text>
        {renderOptions(['Waterproof lamination', 'Writable lamination', 'UV lamination', 'None'], features, setfeatures)}

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Number of copies?</Text>

        {/* Copy counter */}
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
                const newValue = parseInt(prev) < 10 ? (parseInt(prev) + 1).toString() : prev;
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


export default Lamination;

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
