import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { printAsync } from 'react-native-print';




const ReportPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reportData, setReportData] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const navigation = useNavigation(); // If you plan to use navigation

  useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData.map(doc => doc.name));
    };

    fetchCategories();
  }, []);

  const generateReportAndPrint = async () => {
    const reportContent = `<h1>Report for ${selectedCategory}</h1><p>Your dynamic report content here...</p>`;
    // Create an options object with your report content. Assuming it's HTML.
    const options = {
      html: reportContent,
    };
    // Call printAsync with the options object directly without using Print.
    try {
      const result = await printAsync(options);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
};


  const closeReport = () => {
    setShowReport(false);
    setReportData(null);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
        <Picker.Item label="Select Category" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={generateReportAndPrint}>
        <Text style={styles.buttonText}>Generate Report</Text>
      </TouchableOpacity>
      {showReport && (
        <View style={styles.reportContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeReport}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.reportText}>Report:</Text>
          {/* Displaying the generated report content */}
          {/* Consider implementing a method to set and display reportData based on selectedCategory */}
          <Text>{reportData || "Report content will appear here."}</Text>
        </View>
      )}
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  reportContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  reportText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ReportPage;
