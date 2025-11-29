import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Spiral = () => {
  const handleInvoiceNavigate = () => {
    router.push({ pathname: '/user_invoice', params: { from: 'spiral' } });
  };

  const handleBack = () => {
      router.replace('/User_Home'); 
    };

  const [paperSize, setPaperSize] = useState<string>('A4');
  const [color, setColor] = useState<string>('Black and white print spiral');
  const [paperType, setPaperType] = useState<string>('Plastic spiral');
  const [sides, setSides] = useState<string>('Single side spiral');
  const [front_page, setfront_page] = useState<string>('Black');
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
        <Text style={styles.headerText}>Spriral Binding</Text>
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
        {renderOptions(['Black and white print spiral', 'Colour print spiral'], color, setColor)}

        <View style={styles.divider} />

        {/* Section: Paper Type */}
        <Text style={styles.sectionTitle}>Type of spiral binding?</Text>
        {renderOptions(['Plastic spiral', 'Metal wire', 'Double loop wire'], paperType, setPaperType)}

        <View style={styles.divider} />

        {/* Section: Sides */}
        <Text style={styles.sectionTitle}>Single side or Double side?</Text>
        {renderOptions(['Single side spiral', 'Double side spiral'], sides, setSides)}

        <View style={styles.divider} />
        {/* Section: Sides */}
        <Text style={styles.sectionTitle}>Which colour preference you want in front page?</Text>
        {renderOptions(['Black','Blue','Pink','Red'], front_page, setfront_page)}

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
                const newValue = parseInt(prev) < 5 ? (parseInt(prev) + 1).toString() : prev;
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

export default Spiral;

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
